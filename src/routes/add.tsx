import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useState, useEffect } from "react";
import { getCategoriesData, createTransaction } from "@/lib/api/finance.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronLeft, Save } from "lucide-react";

export const Route = createFileRoute("/add")({
  head: () => ({ meta: [{ title: "เพิ่มรายการ – Wanjot" }] }),
  loader: async () => await getCategoriesData(),
  component: AddTransactionPage,
});

function AddTransactionPage() {
  const { categories, userProfile } = Route.useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    amount: "",
    type: "รายจ่าย" as "รายจ่าย" | "รายรับ",
    category_id: "",
    note: "",
    transacted_at: new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:mm
  });

  // Set default category when tab changes
  useEffect(() => {
    const firstCat = categories.find(c => c.type === formData.type);
    if (firstCat) {
      setFormData(prev => ({ ...prev, category_id: firstCat.id }));
    }
  }, [formData.type, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category_id) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (!userProfile?.id) {
      toast.error("ไม่พบข้อมูลผู้ใช้งาน กรุณาลองใหม่อีกครั้ง");
      return;
    }

    setLoading(true);
    try {
      await createTransaction({
        data: {
          user_id: userProfile.id,
          amount: parseFloat(formData.amount),
          type: formData.type,
          category_id: formData.category_id,
          note: formData.note,
          transacted_at: new Date(formData.transacted_at).toISOString(),
        }
      });
      
      toast.success("บันทึกรายการเรียบร้อยแล้ว");
      navigate({ to: "/" });
    } catch (error: any) {
      console.error(error);
      toast.error(`เกิดข้อผิดพลาด: ${error.message || "ไม่สามารถบันทึกได้"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="เพิ่มรายการ">
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/" })}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-display text-2xl font-bold text-cocoa">เพิ่มรายการ</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 paper-card p-5">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: "รายจ่าย" }))}
              className={`rounded-2xl border-2 py-3 font-display text-lg font-bold transition-all ${
                formData.type === "รายจ่าย"
                  ? "border-primary bg-pink-soft text-primary"
                  : "border-transparent bg-muted text-muted-foreground"
              }`}
            >
              รายจ่าย
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: "รายรับ" }))}
              className={`rounded-2xl border-2 py-3 font-display text-lg font-bold transition-all ${
                formData.type === "รายรับ"
                  ? "border-mint bg-mint-soft text-mint-foreground"
                  : "border-transparent bg-muted text-muted-foreground"
              }`}
            >
              รายรับ
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">จำนวนเงิน (บาท)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="text-2xl h-14 font-bold"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label>หมวดหมู่</Label>
            <Select 
              value={formData.category_id} 
              onValueChange={val => setFormData(prev => ({ ...prev, category_id: val }))}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="เลือกหมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter(c => c.type === formData.type)
                  .map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      <span className="flex items-center gap-2">
                        <span>{c.icon || '📦'}</span>
                        <span>{c.name}</span>
                      </span>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">บันทึกช่วยจำ</Label>
            <Input
              id="note"
              placeholder="ซื้ออะไรไปนะ?"
              value={formData.note}
              onChange={e => setFormData(prev => ({ ...prev, note: e.target.value }))}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">วันที่และเวลา</Label>
            <Input
              id="date"
              type="datetime-local"
              value={formData.transacted_at}
              onChange={e => setFormData(prev => ({ ...prev, transacted_at: e.target.value }))}
              className="h-12"
            />
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-bold mt-4" disabled={loading}>
            <Save className="mr-2 h-5 w-5" />
            {loading ? "กำลังบันทึก..." : "บันทึกรายการ"}
          </Button>
        </form>
      </div>
    </PageShell>
  );
}
