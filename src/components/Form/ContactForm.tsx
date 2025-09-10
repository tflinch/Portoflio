import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
  AlertColor,
} from '@mui/material';
import { sendEmail } from '../../services/contact'; // no .ts extension

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormModel {
  name: string;
  email: string;
  number: string;
  subject: string;
  message: string;
}

const initialFormModel: FormModel = {
  name: '',
  email: '',
  number: '',
  subject: '',
  message: '',
};

export default function ContactFormModal({
  open,
  onClose,
}: ContactFormModalProps) {
  const [messageDetails, setMessageDetails] =
    useState<FormModel>(initialFormModel);
  const [errors, setErrors] = useState<Partial<FormModel>>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  } | null>(null);

  const validateForm = () => {
    const next: Partial<FormModel> = {};
    let ok = true;
    const emailRegex =
      /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/i;

    if (!messageDetails.name.trim()) {
      next.name = 'Name cannot be blank';
      ok = false;
    }
    if (!messageDetails.email.trim()) {
      next.email = 'Email Address cannot be blank';
      ok = false;
    } else if (!emailRegex.test(messageDetails.email)) {
      next.email = 'Enter a valid email address';
      ok = false;
    }
    if (!messageDetails.number.trim()) {
      next.number = 'Mobile Number cannot be blank';
      ok = false;
    }
    if (!messageDetails.subject.trim()) {
      next.subject = 'Subject cannot be blank';
      ok = false;
    }
    if (!messageDetails.message.trim()) {
      next.message = 'Message cannot be blank';
      ok = false;
    }

    setErrors(next);
    return ok;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMessageDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting from modal...', messageDetails);
    if (!validateForm()) return;

    try {
      const resp = await sendEmail(messageDetails);
      console.log('sendEmail response:', resp);
      setSnackbar({
        open: true,
        message: 'Your message has been sent!',
        severity: 'success',
      });
      setTimeout(onClose, 400);
    } catch (err: any) {
      console.error('sendEmail error:', err);
      setSnackbar({
        open: true,
        message: err?.message || 'Failed to send message',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') onClose();
        }}
        fullWidth
        maxWidth='sm'
      >
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <h1 data-aligntment='center'>Contact</h1>

            <div className='equal-columns' data-alignment='centered'>
              <div className='input-box'>
                <input
                  type='text'
                  name='name'
                  placeholder='Full Name'
                  value={messageDetails.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  required
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Email Address'
                  value={messageDetails.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  required
                />
              </div>

              <div className='input-box'>
                <input
                  type='tel'
                  name='number'
                  placeholder='Mobile Number'
                  value={messageDetails.number}
                  onChange={handleChange}
                  className={errors.number ? 'error' : ''}
                  required
                />
                <input
                  type='text'
                  name='subject'
                  placeholder='Email Subject'
                  value={messageDetails.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                  required
                />
              </div>

              <div className='text-box'>
                <textarea
                  name='message'
                  placeholder='Your Message'
                  value={messageDetails.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  required
                />
              </div>

              <button type='submit' className='modal-button'>
                Send Message
              </button>
            </div>
          </DialogContent>
        </form>
      </Dialog>

      {snackbar && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar(null)}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar(null)}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
