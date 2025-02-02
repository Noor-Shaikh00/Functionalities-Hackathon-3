"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Address, Rate, trackingObjType } from "../../../types";
import { cartProductsWhichCanBeShipped } from "../../../data";
import Header from "../../components/header";
import Footer from "../../components/footer";

// Helper function to safely access address fields
const getAddressField = (address: Address, field: string): string => {
  switch (field) {
    case "name":
      return address.name;
    case "phone":
      return address.phone;
    case "addressLine1":
      return address.addressLine1;
    case "cityLocality":
      return address.cityLocality;
    case "stateProvince":
      return address.stateProvince;
    case "postalCode":
      return address.postalCode;
    case "countryCode":
      return address.countryCode;
    default:
      return "";
  }
};

const ShippingRatesPage = () => {
  // State for the shipping address
  const [shipeToAddress, setshipeToAddress] = useState<Address>({
    name: "",
    phone: "",
    addressLine1: "1600 Pennsylvania Avenue NW",
    cityLocality: "Washington",
    stateProvince: "DC",
    postalCode: "20500",
    countryCode: "US",
    addressResidentialIndicator: "no",
  });

  // State for shipping rates, selected rate, label, tracking, loading, and errors
  const [rates, setRates] = useState<Rate[]>([]);
  const [rateId, setRateId] = useState<string | null>(null);
  const [labelPdf, setLabelPdf] = useState<string | null>(null);
  const [trackingObj, setTrackingObj] = useState<trackingObjType | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Handle form submission to fetch shipping rates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setRates([]);

    try {
      const response = await axios.post("/api/get-rates", {
        shipeToAddress,
        packages: cartProductsWhichCanBeShipped.map((product) => ({
          weight: product.weight,
          dimensions: product.dimensions,
        })),
      });
      setRates(response.data.shipmentDetails.rateResponse.rates);
    } catch (error) {
      console.error("Error fetching rates:", error);
      setErrors(["An error occurred while fetching rates."]);
    } finally {
      setLoading(false);
    }
  };

  // Handle creating a shipping label
  const handleCreateLabel = async () => {
    if (!rateId) {
      alert("Please select a rate to create a label.");
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await axios.post("/api/label", { rateId });
      const labelData = response.data;
      setLabelPdf(labelData.labelDownload.href);
      setTrackingObj({
        trackingNumber: labelData.trackingNumber,
        labelId: labelData.labelId,
        carrierCode: labelData.carrierCode,
      });
    } catch (error) {
      console.error("Error creating label:", error);
      setErrors(["An error occurred while creating the label."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#FAFAFA] py-12 px-6 wrapper">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-4xl font-bold text-[#252B42] text-center mb-8">
            Shipping Rates Calculator
          </h1>

          {/* Shipping Address Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "name",
                "phone",
                "addressLine1",
                "cityLocality",
                "stateProvince",
                "postalCode",
                "countryCode",
              ].map((field, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={
                    field === "countryCode"
                      ? "Country Code (e.g., US)"
                      : field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                  }
                  value={getAddressField(shipeToAddress, field)}
                  onChange={(e) =>
                    setshipeToAddress({
                      ...shipeToAddress,
                      [field]: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-indigo-400"
                  required
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#23A6F0] text-white font-semibold rounded-md shadow-lg hover:bg-blue-400 disabled:bg-gray-400"
            >
              {loading ? "Calculating Rates..." : "Get Shipping Rates"}
            </button>
          </form>

          {/* Display Available Shipping Rates */}
          {rates.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#252B42] mb-4">
                Available Shipping Rates
              </h2>
              <div className="space-y-4">
                {rates.map((rate) => (
                  <div
                    key={rate.rateId}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors shadow-sm hover:shadow-md ${
                      rateId === rate.rateId
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setRateId(rate.rateId)}
                  >
                    <p className="text-lg font-medium text-[#252B42]">
                      {rate.carrierFriendlyName} - {rate.serviceType}
                    </p>
                    <p className="text-[#23A6F0] font-bold text-xl">
                      {rate.shippingAmount.amount}{" "}
                      {rate.shippingAmount.currency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create Label Button */}
          {rateId && (
            <button
              onClick={handleCreateLabel}
              disabled={loading}
              className="mt-6 w-full py-3 bg-[#23856D] text-white font-semibold rounded-md shadow-lg hover:bg-[#4daf97] disabled:bg-gray-400"
            >
              {loading ? "Creating Label..." : "Create Label"}
            </button>
          )}

          {/* Download Shipping Label */}
          {labelPdf && (
            <div className="text-center mt-8">
              <Link href={labelPdf} target="_blank">
                <button className="px-8 py-3 bg-[#23A6F0] text-white font-semibold rounded-md shadow-lg hover:bg-blue-400">
                  Download Shipping Label
                </button>
              </Link>
            </div>
          )}

          {/* Tracking Details */}
          {trackingObj && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#252B42] mb-4">
                Tracking Details
              </h2>
              <p className="text-gray-700">
                Tracking Number: {trackingObj.trackingNumber}
              </p>
              <p className="text-gray-700">Label ID: {trackingObj.labelId}</p>
              <p className="text-gray-700">
                Carrier Code: {trackingObj.carrierCode}
              </p>
              <Link href={`/tracking/?labelId=${trackingObj.labelId}`}>
                <button className="mt-4 px-6 py-3 bg-[#23A6F0] text-white font-semibold rounded-md shadow-lg hover:bg-blue-400">
                  Track Shipment
                </button>
              </Link>
            </div>
          )}

          {/* Display Errors */}
          {errors.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-red-600 mb-4">
                Errors
              </h2>
              {errors.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingRatesPage;
