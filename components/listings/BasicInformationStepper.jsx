import React, { useContext, useState } from "react";
import { ListingInputContext } from "../../context";
import { Address, Type, Services, StepperControls } from "../index";

const BasicInformationStepper = () => {
  const { formDetails } = useContext(ListingInputContext);
  const { address, formattedAddress, coordinates, storageType, storageFloor, storageFeatures, packing, delivery } =
    formDetails;
  const disableBtn = !address || !storageType || !storageFloor || storageFeatures.length == 0;
  const serviceOptions = ["delivery", "packing"];
  const services = [];
  serviceOptions.map((item) => formDetails[item] && services.push(item));
  const payload = {
    address,
    formattedAddress: {
      street: formattedAddress?.street?.toLowerCase(),
      area: formattedAddress?.area?.toLowerCase(),
    },
    coordinates,
    storageType,
    storageFloor,
    storageFeatures,
    services,
    packing,
    delivery,
  };

  return (
    <>
      <Address />
      <Type />
      <Services />
      <div className="my-16">
        <StepperControls disabled={disableBtn} payload={payload} />
      </div>
    </>
  );
};

export default BasicInformationStepper;
