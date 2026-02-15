"use client";

import { useReactToPrint } from "react-to-print";
import React,{use, useEffect, useRef} from "react";
import { Button } from "@/components/ui/button";


const BillPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    reactToPrintFn();
  }, [reactToPrintFn]);



  return (
    <div ref={contentRef} className="bg-gray-200 h-screen flex justify-center text-black text-[13px]">
      <Button type="button" onClick={reactToPrintFn} className="print:hidden">Print</Button>
      {/* A4 PAGE */}
      <div className="bg-white w-[210mm] p-2">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sheetal Enterprises</h1>
          <p className="text-sm">
            R.C.BARRACK NO.19/224 CHEMBUR COLONY MUMBAI MAHARASHTRA 400074
          </p>
        </div>

        {/* BILL INFO */}
        <table className="w-full border border-black mt-4">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold">
                Bill No : 3250
              </td>
              <td className="border border-black p-2 font-semibold text-right">
                Bill Date : 06-12-2025
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className="border border-black p-2 text-center font-semibold"
              >
                Bill To Party
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border border-black p-3">
                <p>
                  <b>Name :</b> Liberty Marketers
                </p>
                <p>
                  <b>Address :</b> Ernakulam
                </p>
                <p>
                  <b>GSTIN :</b>
                </p>
                <p>
                  <b>Mobile :</b> &nbsp;&nbsp; <b>TEL :</b>
                </p>
                <p>
                  <b>STATE :</b> &nbsp;&nbsp; <b>STATE CODE :</b>
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* FABRIC DETAILS */}
        <div className="mt-4 text-sm">
          <p>
            <b>Fabrics :</b> Proshean Running 44 panna
          </p>
          <p>
            <b>Thans :</b> 15
          </p>
        </div>

        {/* METER VALUES */}
        <div className="mt-2 leading-relaxed text-sm">
          <p>
            30.10&nbsp; 20.20&nbsp; 26.90&nbsp; 29.00&nbsp; 26.80&nbsp; 27.80&nbsp;
            27.90&nbsp; 28.00&nbsp; 28.00&nbsp; 28.00&nbsp; 26.90&nbsp; 27.10&nbsp;
            28.00&nbsp; 24.00&nbsp; 27.50
          </p>
        </div>

        {/* TOTAL METER */}
        <div className="mt-3 text-sm">
          <p>
            <b>Meter :</b> 406.2
          </p>
        </div>

        {/* DIVIDER */}
        <hr className="my-6 border-gray-400" />

        {/* TOTAL SUMMARY */}
        <div className="flex justify-between font-semibold text-sm">
          <span>Total</span>
          <span>Thans : 15</span>
          <span>Meters : 406.2</span>
        </div>

        <hr className="mt-4 border-gray-400" />
      </div>

      {/* Page Styles */}
      <style jsx global>{`
        @page {
          size: A4;
          margin: 12mm;
        }
      `}</style>
    </div>
  );
};

export default BillPage;
