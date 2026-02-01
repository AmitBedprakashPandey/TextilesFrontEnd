"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { citySchema, CityFormValues } from "./city.schema";
import { useEffect, useRef } from "react";
import { focusNext } from "@/components/ReuseFunction";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { createCity, setCloseModel, updateCity } from "../Redux/features/CitySlice";
import { toast } from "sonner";

export function CityForm() {

  const nameRef = useRef<HTMLInputElement>(null);
  const subRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch()

  const { currentCity } = useAppSelector(state => state.City)


  const form = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
    defaultValues: { cityName: "" },
  });


  useEffect(() => {
    if (currentCity) {
      form.setValue("cityName", currentCity.cityName)
    }
  }, [currentCity])



  function onSubmit(params: CityFormValues) {
    try {
      if (currentCity) {
        dispatch(updateCity({ ...params, _id: currentCity._id })).unwrap()
        toast.success("City Updated");
      } else {
        dispatch(createCity(params)).unwrap()
        toast.success("City Created");
      }
    } catch (error) {
      toast.error("Something went wrong")

    }

    dispatch(setCloseModel())
    form.reset()

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-muted p-4 rounded-xl">
        <FormField
          control={form.control}
          name="cityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City Name *</FormLabel>
              <FormControl><Input {...field}
                ref={nameRef}
                onFocus={() => nameRef.current?.select()}
                onKeyDown={focusNext(subRef)}

              /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" ref={subRef} className="focus:bg-green-500 w-full focus:text-white">
          {currentCity ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
