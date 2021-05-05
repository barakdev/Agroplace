import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// Material UI
import { Button, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import swal from "sweetalert";
import { FormControl, Modal, Zoom } from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

// React components
import Paypal from "../Paypal/Paypal";
import { OptionsLocation } from "./OptionsLocation";

const useStyles = makeStyles({
  root: {
    borderColor: "green",
    fontWeight: 525,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    width: 500,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(47, 126, 19, 1)",
    },
  },
});

const buttons = {
  backgroundColor: "#378a19",
  color: "#f7f7f7",

  margin: 10,
};

const FormPayment = () => {
  const classes = useStyles();
  const total = useSelector((state) => state.cartReducer.total);
  const user = useSelector((state) => state.loginReducer.user);
  //
  const cart = useSelector((state) => state.cartReducer);
  const idProducts = cart.cart?.map((product) => product.id);

  //
  const [modal, setModal] = useState(false);
  const [modalCenters, setModalCenters] = useState(false);
  const [input, setInput] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    address: "",
    phoneNumber: 0,
    email: user.email,
  });
  const [url, setUrl] = useState("");
  const id = JSON.parse(localStorage.getItem("user"));

  const [showPaypal, setShowPaypal] = useState(false);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  

  useEffect(() => {
    input.firstName.length !== 0 &&
    input.lastName.length !== 0 &&
    input.address.length !== 0 &&
    input.email.includes("@") &&
    input.phoneNumber.length !== 0
      ? setShowPaypal(true)
      : setShowPaypal(false);
    
  }, [showPaypal, input]);

  const onSubmit = async (e, value) => {
    e.preventDefault();

    if (
      input.firstName.length === 0 ||
      input.lastName.length === 0 ||
      input.address.length === 0 ||
      input.phoneNumber.length === 0
    ) {
      setShowPaypal(false);
      return swal("Aviso!", "Todos los datos son obligatorios", "warning");
    }
    if (!input.email.includes("@")) {
      setShowPaypal(false);
      return swal("Aviso!", "Ingrese un Email valido", "warning");
    }

    await axios.put(`http://localhost:3001/order/orders/${id}`, {
      firstName: input.firstName,
      lastName: input.lastName,
      state: "cart",
      paymentDate: "mercadopago",
      address: input.address,
      email: input.email,
      phoneNumber: input.phoneNumber,
      totalPrice: total,
    });

    const urlMercadopago = await axios.post(
      "http://localhost:3001/cart/checkout",
      {
        title: "Pago AgroPlace",
        totalPrice: total,
      }
    );

    setUrl(urlMercadopago.data.url);
    window.location = urlMercadopago.data.url;
  };

  const onCloseModal = () => {
    setModal(!modal);
  };

  return (
    <div>
     
      <div className="buttons">
        <Button style={buttons} onClick={() => setModalCenters(!modalCenters)}>
          Continuar Compra
        </Button>
      </div>

      <Modal open={modalCenters} onClose={() => setModalCenters(!modalCenters)}>
        <div className="container-payment">
          <OptionsLocation
            modalCenters={modalCenters}
            setModalCenters={setModalCenters}
            onCloseModal={onCloseModal}
          />
        </div>
      </Modal>

      <Modal open={modal} onClose={onCloseModal}>
        <ThemeProvider theme={theme}>
          <div className="container-payment">
            <Typography variant="h5"></Typography>
            <Zoom in={true} timeout={500}>
              <FormControl noValidate autoComplete="off">
                <TextField
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  className={classes.input}
                  label="Nombre"
                  variant="filled"
                  defaultValue={user.firstName}
                  required
                />
                <TextField
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  label="Apellido"
                  variant="filled"
                  className={classes.input}
                  defaultValue={user.lastName}
                  required
                />
                <TextField
                  type="number"
                  name="phoneNumber"
                  label="Telefono de contacto:"
                  variant="filled"
                  onChange={handleChange}
                  className={classes.input}
                  required
                />
                <TextField
                  type="text"
                  name="address"
                  onChange={handleChange}
                  label="Dirección de envío:"
                  variant="filled"
                  className={classes.input}
                  required
                />
                <TextField
                  type="email"
                  name="email"
                  onChange={handleChange}
                  label={"Email"}
                  variant="filled"
                  className={classes.input}
                  defaultValue={user.email}
                />

                <h3> Total: ${total}</h3>

                <Button onClick={(e) => onSubmit(e, "mercadopago")}>
                  Mercadopago
                </Button>

                {showPaypal ? (
                  <Paypal dataClient={input} />
                ) : (
                  <Button onClick={(e) => onSubmit(e, "paypal")}>Paypal</Button>
                )}
              </FormControl>
            </Zoom>
          </div>
        </ThemeProvider>
      </Modal>
    </div>
  );
};

export default FormPayment;
