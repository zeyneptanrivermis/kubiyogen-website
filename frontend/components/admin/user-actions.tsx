"use client";

import { useState } from "react";
import { Button, Modal, Select } from "@/components/ui";

export function UserActions({ name, role }: { name: string; role: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" className="min-h-8 px-3 py-1.5" onClick={() => setOpen(true)}>
        Profil
      </Button>
      <Modal title={`${name} profili`} description="Rol degistirme ve siparis gecmisi icin hazir modal." open={open} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <Select
            label="Rol"
            defaultValue={role}
            options={[
              { label: "USER", value: "USER" },
              { label: "ADMIN", value: "ADMIN" }
            ]}
          />
          <div className="rounded-lg bg-soft p-4 text-sm leading-6 text-slate-600">
            Siparis gecmisi API baglandiginda burada listelenecek.
          </div>
          <Button onClick={() => setOpen(false)}>Degisiklikleri Kaydet</Button>
        </div>
      </Modal>
    </>
  );
}
