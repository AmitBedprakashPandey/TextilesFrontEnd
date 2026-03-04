"use client";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchFabricCustomerById, setLocalStorage } from "@/app/(main)/Redux/features/CustomerFabricSlice";
import { useAppDispatch, useAppSelector } from "../../(main)/Redux/hooks";
import { useParams } from "next/navigation";
import { da } from "zod/v4/locales";

const BillPage: React.FC = () => {
  const params = useParams()
  const id = params.id as string;
  const disptach = useAppDispatch()

  const {localStorage,loading,error,message} =useAppSelector(state => state.CustomerFabric)

  useEffect( () => {
  const fetchData = async () => {
    
    const data = await disptach(fetchFabricCustomerById(id)).unwrap();
    console.log(data);
    
      disptach(setLocalStorage(data));
  }

  fetchData()
  }, [id]);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });




  // useEffect(() => {
  //   reactToPrintFn();
  // }, [reactToPrintFn]);



  return (
    <div className="bg-white text-black flex justify-center">
    <div ref={contentRef} className="a4-page m-5 w-[210mm] shadow-lg print:shadow-none">
      {/* <Button type="button" onClick={reactToPrintFn} className="print:hidden">Print</Button> */}
      {/* A4 PAGE */}
      <div className="w-full break-inside-avoid">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-xl font-bold leading-tight">{localStorage?.company?.companyName}</h1>
          <p className="text-sm">
            {localStorage?.company?.billingStreet1}
            {localStorage?.company?.billingStreet2}
            {localStorage?.company?.billingStreet3}
          </p>
        </div>

        {/* BILL INFO */}
        <table className="w-full border border-black mt-2 text-sm">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold">
                Bill No : 2505
              </td>
              <td className="border border-black p-2 font-semibold text-right">
                Bill Date : {moment(localStorage?.date).format("L")}
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
              <td colSpan={2} className="border border-black p-2">
                <p>
                  <b>Name :</b> {localStorage?.vendor.vendorname}
                </p>
                <p>
                  <b>Address :</b> {localStorage?.vendor.address && localStorage.vendor.address}{localStorage?.vendor.address1 && localStorage?.vendor.address1}
                </p>
                <p>
                  <b>GSTIN :</b> {localStorage?.vendor.gstin}
                </p>
                <p>
                  <b>Mobile :</b> {localStorage?.vendor.mobile}
                </p>
                <p>
                  <b>STATE :</b> {localStorage?.vendor.state} <b>City : </b>{localStorage?.vendor.city}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* FABRIC DETAILS */}
        <div className="grid grid-cols-3 gap-3">
        {localStorage?.groups.map((item,index)=>(       
        
         <div className="p-2 flex flex-col" key={index}>
          <p><b>Fabrics :</b> {item.pattern}</p>
          <p><b>Thans :</b> {item.thaans}</p>
         {/* METER VALUES */}
        <div className="grid grid-cols-4 gap-1 mt-1">
          {item.meters.map((item,index)=>(
            <div className="font-bold " key={index}>
            {item}
            </div>
          ))}
        </div>

          {/* TOTAL METER */}
        <div className="mt-auto pt-2 text-sm">
          <p>
            <b>Meter :</b> {item.totalMeters}
          </p>
        </div>
        </div>      
        
          
        ))}
       </div>


      

        {/* TOTAL SUMMARY */}
        <div className="flex justify-between font-semibold text-sm border-y border-black ">
          <span>Total</span>
          <span>Thans : {localStorage?.grandTotalThaans}</span>
          <span>Meters : {localStorage?.grandTotalMeters}</span>
        </div>
        
      </div>

    </div>
    </div>
  );
};

export default BillPage;
