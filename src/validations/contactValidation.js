import * as yup from 'yup';

export const contactSchema = yup.object().shape({
    fullname: yup.string().required("Please enter full name") ,
    photo: yup.string().url("Url not valid").required("Please enter photo"),
    mobile: yup.number().required("Please enter mobile"),
    email: yup.string().email("Email not valid").required("Please enter email") ,
    job:yup.string().nullable(),
    group:yup.string().required("Please enter group"),
});