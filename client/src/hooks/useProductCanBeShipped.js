import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// * this hook is being used to check if the product can be shipped in the auth user's country
// * this is being used in the single product page only
const useProductCanBeShipped = (product) => {
  const [canBeShipped, setCanBeShipped] = useState(true);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [shippingCountry, setShippingCountry] = useState("");
  const { user } = useSelector((state) => state.authReducer);

  const { shipping_options } = product;

  const checkIfProductCanBeShipped = () => {
    // putting all the countries from the shipping_options in an array
    const temp = [];
    for (let i = 0; i < shipping_options.length; i++) {
      temp.push(product.shipping_options[i].countries);
    }
    const shippingCountries = temp.join().split(",");

    // checking if the product can be shipped in the users country
    setCanBeShipped(shippingCountries.includes(user.country));

    // now checking how much cost it will be to ship this product in the user's country
    for (let i = 0; i < shipping_options.length; i++) {
      if (shipping_options[i].countries.includes(user.country)) {
        setShippingCharge(shipping_options[i].charge);
      } else {
        setShippingCharge("N/A");
      }
    }

    // user's country is the shipping country
    setShippingCountry(user.country);
  };

  useEffect(() => {
    checkIfProductCanBeShipped();
  }, [product._id]);

  return { canBeShipped, shippingCharge, shippingCountry };
};

export default useProductCanBeShipped;
