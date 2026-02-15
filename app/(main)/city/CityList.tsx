import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { fetchCity,SetCurrentCity,clearCurrentCity,setOpenModel,setCloseModel } from "../Redux/features/CitySlice";

export function CityList() {
  
  const dispatch = useAppDispatch();
  const { cityList } = useAppSelector((state) => state.City);

  useEffect(() => {
    dispatch(fetchCity())
  }, [dispatch]);


  return (
    <div className="w-full h-[90dvh] relative overflow-auto">
    <Table >
      <TableHeader>
        <TableRow>
          <TableHead className="p-2">#</TableHead>
          <TableHead className="p-2 text-left">City</TableHead>
          <TableHead className="p-2 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cityList.map((c, i) => (
          <TableRow key={c._id} className="border-t">
            <TableCell className="">{i + 1}</TableCell>
            <TableCell className="capitalize">{c.cityName}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" onClick={()=>{dispatch(SetCurrentCity(c)); dispatch(setOpenModel(true))}}>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
