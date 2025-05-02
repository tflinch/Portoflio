// components/ContactFormModal.tsx
import { useState } from 'react';
import {
  Snackbar,
  Alert,
  AlertColor,
  Dialog,
  DialogContent,
} from '@mui/material';
import { sendEmail } from '../../services/contact.ts';

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormModel {
  name: string;
  email: string;
  number: string;
  message: string;
  subject: string;
}

const initialFormModel: FormModel = {
  name: '',
  email: '',
  number: '',
  message: '',
  subject: '',
};

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  open,
  onClose,
}) => {
  const [messageDetails, setMessageDetails] =
    useState<FormModel>(initialFormModel);
  const [errors, setErrors] = useState<Partial<FormModel>>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormModel> = {};
    let isValid = true;
    if (!messageDetails.name.trim()) {
      newErrors.name = 'Name cannot be blank';
      isValid = false;
    }
    if (!messageDetails.email.trim()) {
      newErrors.email = 'Email Address cannot be blank';
      isValid = false;
    } else {
      const emailRegex =
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
      if (!emailRegex.test(messageDetails.email)) {
        newErrors.email = 'Enter a valid email address';
        isValid = false;
      }
    }
    if (!messageDetails.number.trim()) {
      newErrors.number = 'Mobile Number cannot be blank';
      isValid = false;
    }
    if (!messageDetails.subject.trim()) {
      newErrors.subject = 'Subject cannot be blank';
      isValid = false;
    }
    if (!messageDetails.message.trim()) {
      newErrors.message = 'Message cannot be blank';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await sendEmail(messageDetails);
        setSnackbar({
          open: true,
          message: 'Your message has been sent!',
          severity: 'success',
        });
        onClose();
      } catch (err: any) {
        setSnackbar({
          open: true,
          message: err.message || 'Failed to send message',
          severity: 'error',
        });
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMessageDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSnackbarClose = () => setSnackbar(null);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className='equal-columns' data-alignment='centered'>
              <div className='input-box'>
                <input
                  name='name'
                  placeholder='Full Name'
                  value={messageDetails.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                <input
                  name='email'
                  placeholder='Email Address'
                  value={messageDetails.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              <div className='input-box'>
                <input
                  name='number'
                  placeholder='Mobile Number'
                  value={messageDetails.number}
                  onChange={handleChange}
                  className={errors.number ? 'error' : ''}
                />
                <input
                  name='subject'
                  placeholder='Email Subject'
                  value={messageDetails.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                />
              </div>
              <div className='text-box'>
                <textarea
                  name='message'
                  placeholder='Your Message'
                  value={messageDetails.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                />
              </div>
              <input type='submit' value='Send Message' className='btn' />
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {snackbar && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert severity={snackbar.severity} onClose={handleSnackbarClose}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default ContactFormModal;
