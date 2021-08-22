import faker from "faker";
import moment from "moment";

const newPerson = () => {
  const date = faker.date.past();
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    date_of_birth: moment(date).format("YYYY-MM-DD"),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
  };
};

export default function generateData(num) {
  return new Array(num).fill("").map(() => newPerson());
}
