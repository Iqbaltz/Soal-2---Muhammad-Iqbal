"use client";
import BasicAutoComplete from "@/src/components/BasicAutocomplete";
import { Regency, Province, District, Village } from "@/src/entities/location";
import React, { useState } from "react";

type Props = {
  provinces: Province[];
};

export default function DropdownList({ provinces }: Props) {
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);

  const fetchRegencies = async (provinceId: number) => {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    );
    const data = await response.json();
    return data;
  };

  const fetchDistricts = async (regencyId: number) =>
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
    ).then((response) => response.json());

  const fetchVillages = async (districtId: number) =>
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
    ).then((response) => response.json());

  const handleProvinceChange = async (provinceId: number) => {
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
    const regencies = await fetchRegencies(provinceId);
    setRegencies(regencies);
  };

  const handleRegencyChange = async (regencyId: number) => {
    setDistricts([]);
    setVillages([]);
    const districts = await fetchDistricts(regencyId);
    setDistricts(districts);
  };

  const handleDistrictChange = async (districtId: number) => {
    setVillages([]);
    const villages = await fetchVillages(districtId);
    setVillages(villages);
  };

  return (
    <div className="grid gap-4">
      <BasicAutoComplete
        label="Provinsi"
        name="Province"
        onSelectionChange={(e) => handleProvinceChange(+e)}
        items={provinces?.map((province) => ({
          label: province.name,
          value: province.id.toString(),
        }))}
        isDisabled={provinces?.length === 0}
      />

      <BasicAutoComplete
        label="Kab/Kota"
        name="Regency"
        isDisabled={regencies.length === 0}
        onSelectionChange={(e) => handleRegencyChange(+e)}
        items={regencies.map((regency) => ({
          label: regency.name,
          value: regency.id.toString(),
        }))}
      />

      <BasicAutoComplete
        label="Kecamatan"
        name="District"
        isDisabled={districts.length === 0}
        onSelectionChange={(e) => handleDistrictChange(+e)}
        items={districts.map((district) => ({
          label: district.name,
          value: district.id.toString(),
        }))}
      />

      <BasicAutoComplete
        label="Kelurahan"
        name="Village"
        isDisabled={villages.length === 0}
        items={
          villages?.map((village) => ({
            label: village.name,
            value: village.id.toString(),
          })) || []
        }
      />
    </div>
  );
}
