import React, { memo, useEffect, useState } from "react";
import { CarCardTypes, DataInfo } from "types/car.dto";
import requests from "requests";
import Cars from "./Cars";

const Recommended = memo(() => {
  const [cars, setCars] = useState<CarCardTypes[]>([]);
  const [info, setInfo] = useState<DataInfo>({ total: 0, current: 0, page: 1 });
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  const load = async (next: boolean = false) => {
    setLoading(true);
    try {
      const res = await requests.cars.recommended({
        page: next ? info.page + 1 : info.page,
      });

      setCars((prev) => (next ? [...prev, ...res.data] : res.data));
      const page = res.page;
      setInfo({ total: res.total, current: cars.length + res.current, page });
    } catch (error: any) {
      console.error(error.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    setInitLoading(true);
    load();
    setInitLoading(false);
  }, []);

  return (
    <Cars
      initLoading={initLoading}
      cars={cars}
      title="Recomandation Cars"
      loadMore={() => load(true)}
      info={info}
      loading={loading}
    />
  );
});
Recommended.displayName = "Recommended";
export default Recommended;
