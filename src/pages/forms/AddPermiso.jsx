import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"

export const AddPermiso = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description: "Your absence request has been submitted successfully.",
    });
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border border-gray-300 rounded-md shadow-md mt-4">
    <form onSubmit={handleSubmit} className="items-center space-y-6">
      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <div className="relative">
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="pl-10"
          />
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <div className="relative">
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="pl-10"
          />
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Absence</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="min-h-[400px]"
          placeholder="Please provide details about your absence request..."
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Request
      </Button>
    </form>
    </div>
  )
}

