import { useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Member() {
  const [member] = useState({
    name: "Nabila Surya",
    email: "nabila@luxstay.com",
    status: "Gold Member",
    points: 1850,
    totalBooking: 16,
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-[#334155]">
      {/* Main Profile Card - Premium Soft Design */}
      <div className="bg-white border border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] rounded-2xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div className="flex items-center gap-4">
            {/* Avatar dengan Soft Gradient Ring */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 p-[2px] shadow-sm">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-base">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Welcome Back, {member.name}
              </h2>
              <p className="text-xs font-medium text-[#94A3B8] mt-0.5">
                Thank you for being one of our most loyal guests.
              </p>
            </div>
          </div>
          
          {/* Badge Status Premium */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/70 shadow-sm">
              👑 {member.status}
            </span>
          </div>
        </div>

        {/* Info Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-b from-[#FDFDFD] to-[#F8FAFC] p-4 rounded-xl border border-slate-200/60 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
            <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
              Reward Points
            </p>
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mt-1">
              {member.points.toLocaleString()}
            </h3>
          </div>

          <div className="bg-gradient-to-b from-[#FDFDFD] to-[#F8FAFC] p-4 rounded-xl border border-slate-200/60 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
            <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
              Total Bookings
            </p>
            <h3 className="text-2xl font-extrabold text-[#1E293B] mt-1">
              {member.totalBooking} <span className="text-xs font-normal text-[#64748B]">stays</span>
            </h3>
          </div>

          <div className="bg-gradient-to-b from-[#FDFDFD] to-[#F8FAFC] p-4 rounded-xl border border-slate-200/60 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] sm:col-span-2 md:col-span-1">
            <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
              Next Tier Progress
            </p>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full w-[75%]" />
            </div>
            <p className="text-[10px] text-[#94A3B8] mt-1.5 text-right font-medium">75% to Platinum</p>
          </div>
        </div>
      </div>

      {/* SHADCN TABS */}
      <Tabs defaultValue="profile" className="w-full space-y-6">
        <TabsList className="bg-[#E2E8F0]/60 p-1 border border-slate-200/40 rounded-xl inline-flex w-full sm:w-auto shadow-inner">
          <TabsTrigger 
            value="profile" 
            className="rounded-lg px-5 py-2 text-sm font-semibold text-[#64748B] transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className="rounded-lg px-5 py-2 text-sm font-semibold text-[#64748B] transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
          >
            Booking History
          </TabsTrigger>
          <TabsTrigger 
            value="membership"
            className="rounded-lg px-5 py-2 text-sm font-semibold text-[#64748B] transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
          >
            Membership Benefits
          </TabsTrigger>
        </TabsList>

        {/* TAB CONTENT: PROFILE */}
        <TabsContent value="profile" className="focus-visible:outline-none">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] p-6">
            <h3 className="text-base font-bold text-[#0F172A] mb-5 pb-2 border-b border-slate-100">
              Member Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <span className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Full Name</span>
                <span className="text-sm font-semibold text-[#334155]">{member.name}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Email Address</span>
                <span className="text-sm font-semibold text-[#334155]">{member.email}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Status Account</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Verified
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB CONTENT: HISTORY */}
        <TabsContent value="history" className="focus-visible:outline-none">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] p-6">
            <h3 className="text-base font-bold text-[#0F172A] mb-3">
              Recent Bookings
            </h3>

            <div className="divide-y divide-slate-100">
              {[
                { room: "Luxury Suite", date: "12 January 2025", cost: "$240" },
                { room: "Deluxe Room", date: "28 February 2025", cost: "$140" },
                { room: "Presidential Suite", date: "20 April 2025", cost: "$550" },
              ].map((item, idx) => (
                <div key={idx} className="py-4 flex justify-between items-center first:pt-2 last:pb-2 group hover:bg-slate-50/50 px-2 -mx-2 rounded-xl transition">
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-[#1E293B] group-hover:text-indigo-600 transition">{item.room}</span>
                    <span className="block text-xs text-[#94A3B8] font-medium">{item.date}</span>
                  </div>
                  <span className="text-sm font-bold text-[#334155] bg-slate-100/80 px-2.5 py-1 rounded-lg">{item.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* TAB CONTENT: MEMBERSHIP */}
        <TabsContent value="membership" className="focus-visible:outline-none">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] p-6">
            
            {/* SHADCN DIALOG */}
            <Dialog>
              <DialogTrigger className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold px-5 py-2.5 hover:opacity-95 transition shadow-sm">
                View Membership Details
              </DialogTrigger>

              <DialogContent className="sm:max-w-md rounded-2xl border-slate-200 bg-white">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold text-[#0F172A]">
                    Gold Membership Benefits
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-1.5 mt-4 text-sm text-[#475569]">
                  {["15% Room Discount", "Free Room Upgrade", "Priority Reservation", "Complimentary Breakfast", "Early Check-In Access"].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 px-1 border-b border-slate-50 last:border-none">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-bold shadow-sm">✓</div>
                      <span className="font-medium text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* SHADCN ACCORDION */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
                Frequently Asked Questions
              </h4>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-slate-100">
                  <AccordionTrigger className="text-sm font-semibold text-[#334155] hover:text-indigo-600 transition-colors py-4 focus:no-underline">
                    How do members earn points?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#64748B] leading-relaxed pb-4 font-medium">
                    Members earn points for every hotel reservation, room upgrade, and special service purchased.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b border-slate-100">
                  <AccordionTrigger className="text-sm font-semibold text-[#334155] hover:text-indigo-600 transition-colors py-4 focus:no-underline">
                    How can points be redeemed?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#64748B] leading-relaxed pb-4 font-medium">
                    Points can be exchanged for discounts, free nights, and exclusive hotel services.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-none">
                  <AccordionTrigger className="text-sm font-semibold text-[#334155] hover:text-indigo-600 transition-colors py-4 focus:no-underline">
                    When do points expire?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#64748B] leading-relaxed pb-4 font-medium">
                    Reward points expire after 12 months without any booking activity.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}