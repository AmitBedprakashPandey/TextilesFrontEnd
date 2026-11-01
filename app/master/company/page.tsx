"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomeCofirmDailog from "@/components/CustomeCofirmDailog";
import CustomDialog from "@/components/CustomDialog";
import CompanyForm from "../../../components/CompanyForm";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import {
  Company,
  clearSelectedItem,
  deleteCompany,
  getCompanies,
  setOpenConfirm,
  setOpenFrom,
  setSelectedItem,
} from "@/lib/Redux/Reducers/CompanySlice";

export default function CompanyPage() {
  const dispatch = useAppDispatch();

  const { items, selectedItem, openConfirm, openfrom } = useAppSelector(
    (state) => state.CompanyItems,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return items;
    }

    return items.filter((item) =>
      [
        item.companyName,
        item.ownerName,
        item.city,
        item.state,
        item.email,
        item.gstin,
        item.phone,
        item.mobile,
        item.billingStreet1,
        item.billingStreet2,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(searchValue)),
    );
  }, [items, search]);

  async function onDeleteHandler() {
    if (!selectedItem) return;

    try {
      await dispatch(deleteCompany(selectedItem._id)).unwrap();
      toast.success("Delete Successful");
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Delete Failed",
      );
    }

    dispatch(setOpenConfirm(false));
    dispatch(clearSelectedItem());
  }

  function handleSelectItem(item: Company) {
    dispatch(setSelectedItem(item));
    dispatch(setOpenFrom(true));
  }

  function handleCreateItem() {
    dispatch(clearSelectedItem());
    dispatch(setOpenFrom(true));
  }

  return (
    <div className="block">
      <div className="p-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-bold">Company List</h1>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, owner, city, GST..."
            className="border-black w-full sm:w-72"
          />
          <Button onClick={handleCreateItem}>
            <Plus />Create
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12.5">#</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Pincode</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>GST No</TableHead>
            <TableHead>Phone 1</TableHead>
            <TableHead>Phone 2</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={12}
                className="h-28 text-center text-muted-foreground"
              >
                {search
                  ? "No company found matching your search."
                  : "No company registered yet."}
              </TableCell>
            </TableRow>
          ) : (
            filteredItems.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{item.companyName}</TableCell>
                <TableCell>{item.ownerName}</TableCell>
                <TableCell className="whitespace-normal">
                  {[item.billingStreet1, item.billingStreet2]
                    .filter(Boolean)
                    .join(", ")}
                </TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.pincode}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.gstin}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      className="w-8 h-8"
                      aria-label={`Edit ${item.companyName}`}
                      onClick={() => handleSelectItem(item)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-8 h-8"
                      aria-label={`Delete ${item.companyName}`}
                      onClick={() => {
                        dispatch(setSelectedItem(item));
                        dispatch(setOpenConfirm(true));
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="fixed bottom-5 right-5">
        <Button
          className="rounded-full w-14 h-14"
          aria-label="Create company"
          onClick={handleCreateItem}
        >
          <Plus />
        </Button>
      </div>

      <CustomDialog
        close={() => dispatch(setOpenFrom(false))}
        open={openfrom}
        title={selectedItem ? "Update Company" : "Company Registration"}
        key={"Form"}
      >
        <CompanyForm />
      </CustomDialog>

      <CustomeCofirmDailog
        close={() => dispatch(setOpenConfirm(false))}
        confirm={onDeleteHandler}
        open={openConfirm}
        key={"company"}
        lable="Delete"
      />
    </div>
  );
}
