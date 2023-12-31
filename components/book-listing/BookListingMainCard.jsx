import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorageFeatures } from "../../redux/features/config.slice";
import {
  ArchiveIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  LocationMarkerIcon,
  MapIcon,
  TruckIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
//import { storageFeatures } from "../../helpers/data";
import { distanceInKM, formatMoney } from "../../helpers/utils";
import BookContainer from "./BookContainer";
import Image from "next/image";

const BookListingMainCard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStorageFeatures());
  }, []);

  const { storageFeatures } = useSelector((state) => state.config);

  const { userListing, userListingLoading } = useSelector((state) => state.listing);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  console.log(userListing);

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const nextImage = () => {
    if (currentIndex < userListing?.media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const getFeatures = () => {
    const filter = storageFeatures.filter((p) => userListing?.storageFeatures?.includes(p.value));
    return filter;
  };

  const getFileType = (file) => {
    return file.substring(file.lastIndexOf(".") + 1).toLowerCase();
  };

  return (
    <BookContainer>
      <div className="relative flex h-[200px] w-full overflow-hidden rounded-lg md:h-[400px]">
        {userListing?.media?.length > 0 ? (
          userListing?.media?.map((img, i) => {
            return (
              <div
                key={i}
                className="h-full w-full min-w-full select-none transition-all duration-700"
                style={{ transform: `translate(-${currentIndex * 100}%)` }}>
                {getFileType(img) === "mov" || getFileType(img) === "mp4" ? (
                  <video src={img} controls className="mb-2 h-full w-full rounded object-cover"></video>
                ) : (
                  <Image
                    src={img}
                    alt={img}
                    className="min-w-full select-none rounded-md transition-all duration-700 hover:shadow-md"
                    placeholder="blur"
                    blurDataURL="/dummyListing.png"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                  />
                  // <img
                  //   src={img}
                  //   alt={img}
                  //   className="object-cover min-w-full w-full h-full transition-all duration-700 select-none"
                  // />
                )}
              </div>
            );
          })
        ) : (
          <img
            src="/dummyListing.png"
            alt="no image yet"
            className="h-full w-full min-w-full select-none object-cover transition-all duration-700"
          />
        )}
        {currentIndex > 0 && (
          <div
            className="absolute left-3 top-[50%] flex h-6 w-6 -translate-y-[50%] cursor-pointer select-none items-center justify-center rounded-full bg-[#DDDDDD99] text-white shadow transition-all duration-200 hover:bg-[#ddddddaf] active:scale-90 md:left-5"
            onClick={prevImage}>
            <ChevronLeftIcon className="w-4" />
          </div>
        )}
        {currentIndex < userListing?.media?.length - 1 && (
          <div
            className="absolute right-3 top-[50%] flex h-6 w-6 -translate-y-[50%] cursor-pointer select-none items-center justify-center rounded-full bg-[#DDDDDD99] text-white shadow transition-all duration-200 hover:bg-[#ddddddaf] active:scale-90 md:right-5"
            onClick={nextImage}>
            <ChevronRightIcon className="w-4" />
          </div>
        )}
      </div>

      <div className="">
        <div className="flex items-center justify-between">
          <h3 className="my-3 font-bold capitalize md:text-lg">{userListing?.storageTitle}</h3>

          {userListing?.autoApprove == true && (
            <span
              className="tooltip tooltip-primary rounded-full bg-accent p-[6px] text-sm uppercase"
              data-tip={"Auto approval"}>
              <CheckCircleIcon className="w-4 text-primary" />
              {/* <CheckIcon className="w-4 text-primary" /> */}
            </span>
          )}
        </div>

        <p className="flex flex-row items-center gap-1 text-primary md:gap-2">
          <LocationMarkerIcon className="w-4 min-w-[16px]" />
          <span className="text-sm font-light uppercase md:text-base">{userListing?.address}</span>
        </p>

        <div className="space-y-4 py-3 md:space-y-5">
          {userListing?.description && <p className="text-sm text-[#959595]">{userListing?.description}</p>}
          <div className="flex flex-row gap-3">
            <p className="flex flex-row items-center gap-2">
              <ClockIcon className="w-4" />
              {/* <span className="text-[12px] uppercase">24 HR ACCESS</span> */}
              <span className="text-[12px] uppercase text-[#222222]">
                {`${userListing?.storageAccessPeriod} ACCESS`}{" "}
              </span>
            </p>
            <p className="flex flex-row items-center gap-2">
              <MapIcon className="w-4" />
              <span className="text-[12px] uppercase">{`${userListing?.storageSize?.name || ""} SQ. FT`}</span>
            </p>
          </div>

          {/*storage features */}
          <div className="flex flex-row items-center gap-2">
            {getFeatures()?.map(({ label, value, image }) => (
              <span key={value} className="tooltip tooltip-primary cursor-pointer" data-tip={label}>
                <img src={image} alt="feature-icon" className="h-4 w-4" />
              </span>
            ))}
          </div>
          {/* 
          {(userListing?.delivery || userListing?.packing) && (
            <div className="flex flex-row gap-6">
              {userListing?.delivery && (
                <p className="flex flex-row items-center gap-2">
                  <span className="rounded-full bg-accent p-[6px]">
                    <TruckIcon className="w-4 text-primary" />
                  </span>
                  <span className="text-[12px]">Delivery</span>
                </p>
              )}
              {userListing?.packing && (
                <p className="flex flex-row items-center gap-2">
                  <span className="rounded-full bg-accent p-[6px]">
                    <ArchiveIcon className="w-4 text-primary" />
                  </span>
                  <span className="text-[12px]">Pack & Move</span>
                </p>
              )}
            </div>
          )} */}
          <div className="flex flex-row gap-6 ">
            {userListing?.services?.map(
              (val, i) =>
                (val === "delivery" || val === "packing") && (
                  <div className="flex flex-row gap-6 " key={i}>
                    {val === "delivery" && (
                      <p className="flex flex-row items-center gap-2">
                        <span className="rounded-full bg-accent p-[6px]">
                          <TruckIcon className="w-4 text-primary" />
                        </span>
                        <span className="text-[12px]">Delivery</span>
                      </p>
                    )}

                    {val === "packing" && (
                      <p className="flex flex-row items-center gap-2">
                        <span className="rounded-full bg-accent p-[6px]">
                          <ArchiveIcon className="w-4 text-primary" />
                        </span>
                        <span className="text-[12px]">Pack & Move</span>
                      </p>
                    )}
                  </div>
                )
            )}
          </div>

          {/* {(userListing?.delivery || userListing?.packing) && (
            <div className="flex flex-row gap-6">
              {userListing?.delivery && (
                <p className="flex flex-row items-center gap-2">
                  <span className="rounded-full bg-accent p-[6px]">
                    <TruckIcon className="w-4 text-primary" />
                  </span>
                  <span className="text-[12px]">Delivery</span>
                </p>
              )}
              {userListing?.packing && (
                <p className="flex flex-row items-center gap-2">
                  <span className="rounded-full bg-accent p-[6px]">
                    <ArchiveIcon className="w-4 text-primary" />
                  </span>
                  <span className="text-[12px]">Pack & Move</span>
                </p>
              )}
            </div>
          )} */}
        </div>

        <div className="mt-2 flex flex-row items-center space-x-6">
          {userListing?.monthlyRate ? (
            <p className="text-xl font-semibold text-primary">
              {formatMoney(userListing?.monthlyRate)} <span className="text-sm font-normal text-[#959595]">/month</span>
            </p>
          ) : (
            ""
          )}
          {userListing?.hourlyRate ? (
            <p className="text-xl font-semibold text-primary">
              {formatMoney(userListing?.hourlyRate)} <span className="text-sm font-normal text-[#959595]">/hour</span>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </BookContainer>
  );
};

export default BookListingMainCard;
