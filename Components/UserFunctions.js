import axios from 'axios';
const url = "http://yourip:5000"



const http=axios.create({
  baseURL:url,
});


 export const signup_customer = newUser => {
  return http
    .post('/users/signup_customer', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
      confirmpassword: newUser.confirmpassword,
      phonenumber: newUser.phonenumber,
      age: newUser.age,
      gender: newUser.gender,
      houseno: newUser.houseno,
      streetno: newUser.streetno,
      area: newUser.area,
      city: newUser.city,
      role: newUser.role
    })
   .then(response => {
   

     return response.data
    
    }).catch(err => {
      console.log(err)

      return err.data
    })  
} 

export const login = user => {

  console.log(user.device_id+' hh')
  
  return http
    .post('/users/login', {
      
      email: user.email,
      password: user.password,
      device_id: user.device_id
    })
    .then(response => {
      console.log(response)

      return response.data
    })
    .catch(err => {
   

     return err.data
    })
} 

export const update = updateUser => {
  return http
    .post('/users/update', {
      first_name: updateUser.first_name,
      last_name: updateUser.last_name,
      email: updateUser.email,
      phonenumber: updateUser.phonenumber,
      age: updateUser.age,
      gender: updateUser.gender,
      houseno: updateUser.houseno,
      streetno: updateUser.streetno,
      area: updateUser.area,
      city: updateUser.city,
      status: updateUser.status
    })
    .then(response => {

      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}

export const getProfile = user => {
  return http
    .get('users/profile', {
      
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const changepassword = changepasswordUser => {
  return http
    .post('users/changepassword', {
      email: changepasswordUser.email,
      password: changepasswordUser.password,
      newpassword: changepasswordUser.newpassword,
     
    })
    .then(response => {
    
      return response.data
    })
    .catch(err => {
      console.log(err)
      return error.data
    })
}

export const sendemail = useremail => {
  return http
    .post('/users/sendemail', {
      email: useremail.email
    })
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}

export const verifyCode = codeDetails => {
  return http
    .post('/users/verifyCode', {
      email: codeDetails.email,
      verifycode: codeDetails.code
    })
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}

export const updatepassword = newpassword => {
  return http
    .post('/users/updatepassword', {
      email: newpassword.email,
      newpassword: newpassword.password
    }).then(response => {
      
      console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}

export const logout = () => {
  return http

  ('/logout').then(response => {
    return response.data
  }).catch(err => {
    console.log(err)
  })
}


/*********************COMPLAINTS/REVIEWS**************************/ 

export const getcomplaintcat = () => {
  return http

  .get('/complaintcategorys/getallcomplaintcategory').then(response =>{
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const getAllComplaints = () => {
  return http 

  .get('/tickets/getallticketsofcustomer').then(response => {
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const getOneComp = comp => {
  return http 

  .get('/tickets/getticket/' + comp.ticket_id).then(response => {
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const delComp = comp => {
  return http

  .post('/tickets/deleteticket', {
    ticket_id: comp.ticket_id
  }).then(response => {
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}


export const regcomplaint = newcompl => {
  return http

  .post('/tickets/addticket', {
    customer_id: newcompl.customer_id,
   // date: newcompl.date,
  //  time: newcompl.time,
    complaint_id: newcompl.complaint_id,
    complaint: newcompl.complaint
  })

  .then(response => {
    console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}


export const reply = response => {
  return http

  .post('/ticketsresponses/addticketsresponse', {
    ticket_id: response.ticket_id,
    message: response.message
  }).then(response => {
    console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}

export const feedback = subFeed =>{
  return http

  .post('/ticketsfeedbacks/addticketsfeedback', {
    ticket_id: subFeed.ticket_id,
    feedback: subFeed.feedback
  }).then(response => {
    console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}

export const feedbackget = tick => {
  return http

  .get('/ticketsfeedbacks/getticketsfeedback/' + tick.ticket_id
  ).then(response => {
    console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    }) 
}


export const getProducts = products => {
  return http

  .get('/carts/getcartproducts/'+ products.cart_id
  
  ).then(response => {
    console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}



export const regreview = newRev => {
  return http

  .post('/reviews/addreview', {
   // email: newRev.email,
    customer_id: newRev.customer_id,
   // date: newRev.date,
  //  time: newRev.time,
   // prod: newRev.prod,
    review: newRev.review,
    cart_id: newRev.cart_id,
    ratings: newRev.ratings
  })

  .then(response => {
    console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}


export const getAllReviews = user =>{
  return http

  .get('/reviews/getallreview', {
      customer_id: user.customer_id
  }).then(response => {
    console.log(response)
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const getOneReview = review => {
  return http 

  .get('/reviews/getreview' , {
    review_id : review.review_id
  }).then(response => {
    console.log(response)
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const delreview = reviewdel => {
  return http
  
  .post('/reviews/deletereview', {
    review_id: reviewdel.review_id
  }).then(response => {
    console.log(response)
    return response.data
  })
  .catch(err => {
    console.log(err)
  }) 
}

export const getallcarts = () => {
  return http

  .get('/carts/getallcartsofcustomer').then (response => {
    return response.data
  }).catch (err => {
    console.log(err)
  })
}



/********************FIND/RESERVE/DETAILS/ETC*************************/ 

export const getprods = () => {
  return http
    .get('/products/getallproductforcustomer', {
    })
    .then(response => {
   //   console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}


export const getprodrec = () => {
  return http
  .get('/products/getallrecommendedproductforcustomer', {
  })
  .then(response => {
 //   console.log(response)
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const onReserve = res_prod => {
  return http
 
  .post('/reservedproducts/addreservedproduct', {
    product_id: res_prod.product_id,
    customer_id: res_prod.customer_id,
    reserved_quantity: res_prod.reserved_quantity,
    reserved_time: res_prod.reserved_time,
  //  reservation_date: res_prod.reservation_date
  })

  .then(response => {
    console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err.data
    })
}

export const getReserved = () => {
  return http
  .get('/reservedproducts/getallreservedproductofcustomer')
  .then(response => {
    //console.log(response)
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const deleteReservation= (product) => {
  return http

  .post('/reservedproducts/cancelreservation', {
    reservation_id: product.reservation_id
  }).then(response => {
      
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
    return err.data
  })
}

export const deltefromlist= (product) => {
  return http 

  .post('/reservedproducts/deletereservedproduct', {
    reservation_id : product.reservation_id
  }).then( response => {

    return response.data
  }).catch(err => {
    console.log(err)
    return err.data
  })
}

export const viewresproduct = (vproduct) => {

  return http

  .get('/products/getproduct/'+ vproduct.product_id
  ).then(response => {
      
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
    return err.data
  })
}

export const proddetails= (detproduct) => {
 return http

 .get('/products/getproduct/'+ detproduct.product_id, {
   
 }).then(response => {
      
  console.log(response.data)
  return response.data
})
.catch(err => {
  console.log(err)
  return err.data
})
}

export const getcategories = () =>{
  return http 

  .get('/categories/getallcategory').then(response =>{
    
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
    return err.data
  });
}

export const getsubcategories = () => {
  return http

  .get('/subcategories/getallsubcategory').then(response => {
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
    return err.data
  });
}

export const userHistory= (search_id) => {
  return http

  .post('/customersearches/addcustomersearches', {
    search : search_id
  }).then( response => {

    return response.data
  }).catch(err => {
    console.log(err)
    return err.data
  })
}


/********************BILLING/PURCHASES/ETC*************************/ 

export const getDetails = (getCart) => {
  return http

  .get('/carts/getcartforconfirmation/' + getCart.cart_id

  ).then(response => {
      
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
    return err.data
  })
}

export const confirmation = (cart) => {

  console.log(cart.cart_id)

  return http

  .post('/carts/cartconfirmation', {
    cart_id: cart.cart_id
  }).then(response => {
    console.log(response.data)
    return response.data
  })
  .catch(err => {
    console.log(err)
    return err.data
  }) 
}

export const getHistory = () => {
  return http

  .get('/carts/getallcartsofcustomer'
  ).then(response => {
    console.log(response.data)
    return response.data
  }).catch (err =>{
    console.log(err)
    return err.data
  })
}


export const getCartDetails = (cart) =>{
  return http

  .get('/carts/getalldetailofcart/'+cart.cart_id
  ).then(response => {
    console.log(response.data)
    return response.data
  }).catch (err =>{
    console.log(err)
    return err.data
  })
}




