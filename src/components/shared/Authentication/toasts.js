import { toast } from 'react-toastify';


export const notify = (text, type) => {
    if (type === "success") {
        toast.success('احراز هویت موفقیت آمیز بود');
    } else {
        toast.error('فیلد های زیر را بررسی کنید')
    }
};
