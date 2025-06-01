import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Grid, Stepper } from "@mantine/core";
import RentalCar from "components/Rent/RentalCar";
import MyComp from "containers/MyComp";
import useRentalForms from "hooks/useRentalForms";
import MyFooter from "layouts/MyFooter";
import MyHeader from "layouts/MyHeader";
import { FinalFormType } from "types/rental.dto";
import requests from "requests";
import { CarDetails } from "types/car.dto";
import { useRouter } from "next/router";
import { FetchStatus } from "types/request.dto";
import { getDifferenceInDays } from "utils/diffDates";
import ErrorOverlay from "components/Rent/ErrorOverlay";

const Billing = dynamic(() => import("components/Rent/Billing"));
const RentalInfo = dynamic(() => import("components/Rent/RentalInfo"));
const Payment = dynamic(() => import("components/Rent/Payment"));
const Confirmation = dynamic(() => import("components/Rent/Confirmation"));
const BoxTitle = dynamic(() => import("components/Rent/BoxTitle"));

const CarRent = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { billingForm, rentalForm, payment, confirmation } = useRentalForms();
  const [car, setCar] = useState<CarDetails | null>(null);
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [period, setPeriod] = useState<number | null>(null);
  const [dates, setDates] = useState({ date_from: "", date_to: "" });

  const finalForm: FinalFormType = {
    billing: billingForm.values,
    rentalInfo: {
      carID: car?.id,
      days: period || 1,
      totalPrice: Number(Number(car?.price! * period! || 1).toFixed(1)),
      address_from: rentalForm.values.address_from,
      address_to: rentalForm.values.address_to,
      ...dates,
    },
    paymentMethod: { type: payment.tab, ...payment[payment.tab].values },
  };

  const steps = [
    {
      title: "Billing Info",
      desc: "Please enter your billing info",
      render: (header: React.ReactNode) => (
        <Billing
          form={billingForm}
          header={header}
          nextStep={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Rental Info",
      desc: "Please select your rental date",
      render: (header: React.ReactNode) => (
        <RentalInfo
          form={rentalForm}
          header={header}
          nextStep={() => setCurrentStep(2)}
          prevStep={() => setCurrentStep(0)}
        />
      ),
    },
    {
      title: "Payment Method",
      desc: "Please enter your payment method",
      render: (header: React.ReactNode) => (
        <Payment
          form={payment}
          header={header}
          nextStep={() => setCurrentStep(3)}
          prevStep={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Confirmation",
      desc: "We are getting to the end. Just few clicks and your rental is ready!",
      render: (header: React.ReactNode) => (
        <Confirmation
          form={confirmation}
          header={header}
          prevStep={() => setCurrentStep(2)}
          finalForm={finalForm}
        />
      ),
    },
  ];

  const fetchCar = async (carSlug: string | string[]) => {
    try {
      const res = await requests.cars.details(carSlug);
      if (res.status === 200) {
        setCar(res.data);
        setStatus("ok");
      } else if (res.status === 404) {
        setStatus("not-found");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (router.query?.slug) fetchCar(router.query.slug);
  }, [router.query?.slug]);

  useEffect(() => {
    const { date_from, date_to, time_from, time_to } = rentalForm.values;
    if (date_from && date_to) {
      const { diff, from, to } = getDifferenceInDays(
        date_from,
        date_to,
        time_from,
        time_to,
      );
      setDates({ date_from: from, date_to: to });
      setPeriod(diff);
    } else {
      setPeriod(null);
    }
  }, [rentalForm.values]);

  return (
    <>
      <MyHeader />
      <MyComp py={30}>
        {status !== "loading" && status !== "ok" && (
          <ErrorOverlay showRefreshBtn={status !== "error"} />
        )}

        <Stepper
          color="indigo"
          style={{ flex: 1 }}
          active={currentStep}
          breakpoint="sm"
        >
          {steps.map((step, i) => (
            <Stepper.Step
              key={i}
              label={"Step " + (i + 1)}
              description={step.title}
            />
          ))}
        </Stepper>
        <Grid gutter={30} mt="xl">
          <Grid.Col span={12} md={6.5} lg={7.5}>
            {steps[currentStep].render(
              <BoxTitle
                title={steps[currentStep].title}
                desc={steps[currentStep].desc}
                step={currentStep + 1}
              />,
            )}
          </Grid.Col>
          <Grid.Col span={12} md={5.5} lg={4.5}>
            <RentalCar car={car} status={status} period={period} />
          </Grid.Col>
        </Grid>
      </MyComp>
      <MyFooter />
    </>
  );
};

export default CarRent;
