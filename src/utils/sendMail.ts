const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(
  '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',
);

interface Msg {
  to: any;
  templateId: string;
  dynamicTemplateData: any;
}

const sendMail = async (msg: Msg) => {
  const send = {
    from: {
      email: 'noreply@matchpadel.cl',
      name: 'Match Padel',
    },
    ...msg,
  };

  try {
    return await sgMail.send(send);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    return error;
  }
};

export default sendMail;

/*
{
  to: 'pedro@algramo.com',
  from: {
    email: 'noreply@matchpadel.cl',
    name: 'Match Padel',
  }, // Use the email address or domain you verified above
  templateId: 'd-32d02f41b1b04f4bbeefb621f23d7aa6',
  dynamicTemplateData: {
    name: 'Pedro',
    amount: '150.000',
  },
};
*/
