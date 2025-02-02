import gql from 'graphql-tag';

export const me = gql`
  {
    me {
      email
      firstName
      lastName
    }
  }
`;

export const listUserAddresses = gql`
  {
    listUserAddresses {
      street
      houseNumber
      receiverName
      city
      state
    }
  }
`;

export const listAllProducts = gql`
  {
    listAllProducts {
      name
      quantity
      sku
      value
      status
    }
  }
`;
export const listUserOrders = gql`
  {
    listUserOrders {
      totalValue
      status
    }
  }
`;
export const createUserMutation = gql`
  mutation {
    signUp(
      input: {
        firstName: "Gustavo"
        lastName: "Oliveira"
        email: "teste@teste.com.br"
        identityNumber: "123.456.789-00"
        password: "Teste123"
      }
    ) {
      email
      firstName
      lastName
    }
  }
`;

export const signInUser = gql`
  mutation {
    signIn(input: { email: "teste@teste.com.br", password: "Teste123" }) {
      role
      accessToken
    }
  }
`;

export const createUserAddress = gql`
  mutation {
    createAddress(
      address: {
        street: "Rua Manuel Mendes Ribeiro"
        houseNumber: 116
        complement: "Portão Cinza"
        postalCode: "03737-030"
        receiverName: "Gustavo Oliveira"
        city: "São Paulo"
        state: "SP"
      }
    ) {
      street
      houseNumber
      receiverName
    }
  }
`;
export const createProduct = gql`
  mutation {
    createProduct(
      product: {
        name: "IPhone 15 256GB"
        sku: "apple-iphone-15-256"
        quantity: 10
        value: 5500.00
      }
    ) {
      name
      sku
      value
      quantity
      status
    }
  }
`;
export const updateProduct = gql`
  mutation {
    updateProduct(product: { id: 1, quantity: 20 }) {
      id
      name
      quantity
    }
  }
`;
export const createOrder = gql`
  mutation {
    createOrder(products: [{ sku: "apple-iphone-15-256", quantity: 1 }]) {
      totalValue
      status
    }
  }
`;
