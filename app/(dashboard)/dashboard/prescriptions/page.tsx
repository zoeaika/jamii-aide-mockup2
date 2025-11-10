'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FamilyMember = {
  id: string;
  name: string;
};

export default function NewPrescriptionPage() {
  const router = useRouter();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    familyMemberId: '',
    prescriptionType: '',
    doctorName: '',
    prescriptionImageUrl: '',
    verificationReceipts: '',
    medications: [
      { name: '', dosage: '', frequency: '', duration: '' },
    ],
  });

  useEffect(() => {
    // fetch available family members
    const loadFMs = async () => {
      try {
        const res = await fetch('/api/family-members');
        const data = await res.json();
        setFamilyMembers(data.familyMembers || []);
      } catch (e) {
        console.error(e);
      }
    };
    loadFMs();
  }, []);

  const updateMed = (index: number, field: string, value: string) => {
    setForm((prev) => {
      const meds = [...prev.medications];
      // @ts-ignore
      meds[index] = { ...meds[index], [field]: value };
      return { ...prev, medications: meds };
    });
  };

  const addMedication = () => {
    setForm((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '', duration: '' }],
    }));
  };

  const submit = async () => {
    if (!form.familyMemberId || !form.prescriptionType || !form.verificationReceipts) {
      alert('Family member, prescription type, and verification receipts are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          familyMemberId: form.familyMemberId,
          prescriptionType: form.prescriptionType,
          doctorName: form.doctorName || null,
          prescriptionImageUrl: form.prescriptionImageUrl || null,
          verificationReceipts: form.verificationReceipts,
          medications: form.medications
            .filter((m) => m.name || m.dosage)
            .map((m) => ({
              genericName: m.name,
              dosage: m.dosage,
              frequency: m.frequency,
              duration: m.duration,
            })),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create prescription');
      }

      router.push('/dashboard/prescriptions');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 lg:px-0">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">New Prescription</h1>
      <p className="text-sm text-gray-500 mb-6">
        Upload or record a prescription for a family member.
      </p>

      <div className="bg-white border rounded-xl p-5 space-y-5">
        {/* family member */}
        <div>
          <label className="block text-sm font-medium mb-1">Family member</label>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={form.familyMemberId}
            onChange={(e) => setForm((p) => ({ ...p, familyMemberId: e.target.value }))}
          >
            <option value="">Select…</option>
            {familyMembers.map((fm) => (
              <option key={fm.id} value={fm.id}>
                {fm.name}
              </option>
            ))}
          </select>
        </div>

        {/* prescription type */}
        <div>
          <label className="block text-sm font-medium mb-1">Prescription type / diagnosis</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={form.prescriptionType}
            onChange={(e) => setForm((p) => ({ ...p, prescriptionType: e.target.value }))}
            placeholder="Hypertension meds, post-op, pain, diabetes..."
          />
        </div>

        {/* doctor + image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Doctor / CHW (optional)</label>
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={form.doctorName}
              onChange={(e) => setForm((p) => ({ ...p, doctorName: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Prescription image URL (optional)
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={form.prescriptionImageUrl}
              onChange={(e) => setForm((p) => ({ ...p, prescriptionImageUrl: e.target.value }))}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* verification receipts required by your schema */}
        <div>
          <label className="block text-sm font-medium mb-1">Verification receipts</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={form.verificationReceipts}
            onChange={(e) =>
              setForm((p) => ({ ...p, verificationReceipts: e.target.value }))
            }
            placeholder="Mpesa ref / pharmacy receipt / scan id..."
          />
          <p className="text-xs text-gray-400 mt-1">
            Your Prisma model requires this field.
          </p>
        </div>

        {/* meds */}
        <div>
          <p className="text-sm font-medium mb-2">Medications</p>
          <div className="space-y-3">
            {form.medications.map((m, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <input
                  className="border rounded-lg px-2 py-1 text-sm"
                  placeholder="Name"
                  value={m.name}
                  onChange={(e) => updateMed(idx, 'name', e.target.value)}
                />
                <input
                  className="border rounded-lg px-2 py-1 text-sm"
                  placeholder="Dosage"
                  value={m.dosage}
                  onChange={(e) => updateMed(idx, 'dosage', e.target.value)}
                />
                <input
                  className="border rounded-lg px-2 py-1 text-sm"
                  placeholder="Frequency"
                  value={m.frequency}
                  onChange={(e) => updateMed(idx, 'frequency', e.target.value)}
                />
                <input
                  className="border rounded-lg px-2 py-1 text-sm"
                  placeholder="Duration"
                  value={m.duration}
                  onChange={(e) => updateMed(idx, 'duration', e.target.value)}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMedication}
            className="mt-3 text-sm text-indigo-600"
          >
            + Add another medication
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg border text-sm"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm"
            type="button"
          >
            {loading ? 'Saving…' : 'Save prescription'}
          </button>
        </div>
      </div>
    </div>
  );
}
