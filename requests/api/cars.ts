import { AddCarType, CarCardTypes, CarDetails } from "types/car.dto";
import { CarFilterParamTypes, FilterResData } from "types/request.dto";
import { request } from "../request";
import dummyCars from "data/cars";
import { shuffleArray } from "utils";

const cars = {
  popular: async (params?: {
    page?: string;
  }): Promise<{ data: CarCardTypes[] }> =>
    //request.get('/car/popular', { params }).then((res) => res.data),
    ({ data: shuffleArray(dummyCars).slice(0, 6) }),

  recommended: async (p?: { page?: number; count?: number }) =>
    // data:[], total: 100, current: 30, page: 3, count: 10
    //request.get("/car/recommended", { params }),
    {
      let data = dummyCars;

      const page = p?.page || 1;

      const size = p?.count || 10;
      const from = (page - 1) * size;
      const to = from + size;

      data = dummyCars.slice(from, to);

      return {
        page: page,
        current: data.length,
        total: dummyCars.length,
        data: data,
      };
    },

  filter: async (p: CarFilterParamTypes): Promise<FilterResData> =>
    //request.get("/car/filter", { params }).then((res) => res.data),
    {
      const selectedTypes = p?.type?.split(",") || [];
      const selectedCapacities = p?.capacity?.split(",").map(Number) || [];

      let data = [];
      const types: Record<string, number> = {};
      const capacities = new Set<number>();
      let maxPrice = 0;

      const page = p?.page || 1;
      const size = 8;
      const from = (page - 1) * size;
      const to = from + size;
      let total = 0;

      for (let i = 0; i < dummyCars.length; i++) {
        const car = dummyCars[i];
        if (!car) break;

        const type = car.car_type.replaceAll(" ", "-");

        types[type] = (types[type] || 0) + 1;
        if (p?.type && selectedTypes.indexOf(type) === -1) continue;

        capacities.add(car.specs.capacity);
        if (
          p?.capacity &&
          selectedCapacities.indexOf(car.specs.capacity) === -1
        )
          continue;

        maxPrice = Math.max(maxPrice, car.price);

        const min = p?.min || 0;
        const max = p?.max || Infinity;
        if (car.price < min || car.price > max) continue;

        total += 1;
        //if (from <= i && i < to)
        data.push(car);
      }

      if (p.sort === "asc") data.sort((a, b) => a.price - b.price);
      else if (p.sort === "desc") data.sort((a, b) => b.price - a.price);
      else if (p.sort) data = shuffleArray(data);

      return {
        data: data,
        total,
        page,
        current: data.length,
        filter: {
          type: Object.keys(types).map((type) => ({
            label: type,
            selected: selectedTypes.includes(type),
            total: types[type],
          })),
          capacity: Array.from(capacities, (capacity) => ({
            label: capacity,
            selected: selectedCapacities.includes(capacity),
          })),
          price: {
            min: 0,
            max: maxPrice,
            selected_min: p?.min || 0,
            selected_max: p?.max || maxPrice,
          },
        },
      };
    },

  slugs: async (count: number = 10): Promise<{ slug: string }[]> =>
    //request.get("/car/slugs?count=" + count).then((res) => res.data)
    dummyCars.map((car) => ({ slug: car.slug })),

  details: async (
    slug: string | string[],
  ): Promise<{
    status: number;
    message: "success" | "failure";
    data: CarDetails;
  }> =>
    //request.get("/car/detail/" + slug).then((res) => res.data)
    {
      const { image, ...car } = dummyCars.find((car) => car.slug === slug)!;

      return {
        status: 200,
        message: "success",
        data: {
          ...car,
          images: [image],
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim iusto natus dolore facere recusandae. Culpa, hic minus ipsa perferendis et harum voluptatem asperiores reiciendis, repellendus minima veritatis molestias saepe quam",
          rating: { total: 4, average: 4.8 },
        },
      };
    },

  carTypes: async (): Promise<{ value: string; label: string }[]> =>
    //request.get("/car/types").then((res) =>
    //  (res.data ?? []).map((n: { name: string }) => ({
    //    value: n.name,
    //    label: n.name,
    //  })),
    //),
    {
      const types = dummyCars.reduce((arr, cur) => {
        if (arr.indexOf(cur.car_type) === -1) arr.push(cur.car_type);
        return arr;
      }, [] as string[]);

      return types.map((type) => ({ value: type, label: type }));
    },
  add: (data: AddCarType): Promise<{ status: number; message: string }> =>
    request.post("/car/add", data).then((res) => res.data),
  addCarType: (
    name: string,
  ): Promise<{ message: string; data: { name: string } }> =>
    request.post("/car/type/add", { name }).then((res) => res.data),
};
export default cars;
