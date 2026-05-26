import crypto from 'crypto';

export type PaytrTokenInput = {
  merchantOid: string;
  email: string;
  amount: number;
  userIp: string;
  basket: Array<[string, string, number]>;
  successUrl: string;
  failUrl: string;
};

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
};

export const createPaytrToken = (input: PaytrTokenInput) => {
  const merchantId = required('PAYTR_MERCHANT_ID');
  const merchantKey = required('PAYTR_MERCHANT_KEY');
  const merchantSalt = required('PAYTR_MERCHANT_SALT');
  const amountInKurus = Math.round(input.amount * 100);
  const basket = Buffer.from(JSON.stringify(input.basket)).toString('base64');
  const noInstallment = '0';
  const maxInstallment = '0';
  const currency = 'TL';
  const testMode = process.env.PAYTR_TEST_MODE ?? '1';

  const hashString = `${merchantId}${input.userIp}${input.merchantOid}${input.email}${amountInKurus}${basket}${noInstallment}${maxInstallment}${currency}${testMode}`;
  const token = crypto
    .createHmac('sha256', merchantKey)
    .update(hashString + merchantSalt)
    .digest('base64');

  return {
    merchant_id: merchantId,
    user_ip: input.userIp,
    merchant_oid: input.merchantOid,
    email: input.email,
    payment_amount: amountInKurus,
    paytr_token: token,
    user_basket: basket,
    debug_on: process.env.PAYTR_DEBUG ?? '1',
    no_installment: noInstallment,
    max_installment: maxInstallment,
    user_name: input.email,
    user_address: 'Kubiyogen online order',
    user_phone: '0000000000',
    merchant_ok_url: input.successUrl,
    merchant_fail_url: input.failUrl,
    timeout_limit: '30',
    currency,
    test_mode: testMode,
    lang: 'tr',
  };
};

export const verifyPaytrCallback = (body: Record<string, unknown>) => {
  const merchantKey = required('PAYTR_MERCHANT_KEY');
  const merchantSalt = required('PAYTR_MERCHANT_SALT');
  const merchantOid = String(body.merchant_oid ?? '');
  const status = String(body.status ?? '');
  const totalAmount = String(body.total_amount ?? '');
  const hash = String(body.hash ?? '');
  const expected = crypto
    .createHmac('sha256', merchantKey)
    .update(merchantOid + merchantSalt + status + totalAmount)
    .digest('base64');

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected));
};
