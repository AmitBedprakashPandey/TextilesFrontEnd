"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CustomDialog from "@/components/CustomDialog";
import CompanyForm from "@/components/CompanyForm";
import { useState } from "react";

export default function page() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="p-3 flex justify-between">
        <h1 className="font-bold">Vendor List</h1>
        <Button
        onClick={()=>setOpen(true)}
        >
          <Plus />
          Create
        </Button>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <CustomDialog
        children={<CompanyForm />}
        close={() => setOpen(false)}
        open={open}
        title="Create Vendor"
      />
    </>
  );
}
