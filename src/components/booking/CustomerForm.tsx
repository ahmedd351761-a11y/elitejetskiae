import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Users, AlertCircle } from 'lucide-react';
import { BookingFormData } from '@/types';
import { validateEmail, validatePhone } from '@/utils/bookingUtils';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  onSubmit: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
}

export default function CustomerForm({ onSubmit, onBack }: Props) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    numParticipants: 1,
    emergencyContact: '',
    specialRequirements: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: string | number | boolean) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'customerName':
        if (!value || (value as string).trim().length < 2) {
          newErrors.customerName = t('booking.enterFullName');
        } else {
          delete newErrors.customerName;
        }
        break;
      case 'customerEmail':
        if (!validateEmail(value as string)) {
          newErrors.customerEmail = t('booking.enterValidEmail');
        } else {
          delete newErrors.customerEmail;
        }
        break;
      case 'customerPhone':
        if (!validatePhone(value as string)) {
          newErrors.customerPhone = t('booking.enterValidPhone');
        } else {
          delete newErrors.customerPhone;
        }
        break;
      case 'acceptTerms':
        if (!value) {
          newErrors.acceptTerms = t('booking.mustAcceptTerms');
        } else {
          delete newErrors.acceptTerms;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = {
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      acceptTerms: true
    };
    setTouched(allTouched);

    validateField('customerName', formData.customerName);
    validateField('customerEmail', formData.customerEmail);
    validateField('customerPhone', formData.customerPhone);
    validateField('acceptTerms', formData.acceptTerms);

    if (
      formData.customerName.trim().length >= 2 &&
      validateEmail(formData.customerEmail) &&
      validatePhone(formData.customerPhone) &&
      formData.acceptTerms
    ) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-[#E31E24] mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>{t('booking.backToDateSelection')}</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-black text-[#0A1128] mb-2">
          {t('booking.yourInformation')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('booking.provideDetails')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#0A1128] mb-2">
              {t('booking.fullName')} *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                onBlur={() => handleBlur('customerName')}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.customerName && touched.customerName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#E31E24]'
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.customerName && touched.customerName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.customerName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0A1128] mb-2">
              {t('booking.emailAddress')} *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleChange('customerEmail', e.target.value)}
                onBlur={() => handleBlur('customerEmail')}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.customerEmail && touched.customerEmail
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#E31E24]'
                }`}
                placeholder="john@example.com"
              />
            </div>
            {errors.customerEmail && touched.customerEmail && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.customerEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0A1128] mb-2">
              {t('booking.phoneNumber')} *
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => handleChange('customerPhone', e.target.value)}
                onBlur={() => handleBlur('customerPhone')}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.customerPhone && touched.customerPhone
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#E31E24]'
                }`}
                placeholder="+971526977676"
              />
            </div>
            {errors.customerPhone && touched.customerPhone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.customerPhone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0A1128] mb-2">
              {t('booking.numberOfParticipants')} *
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={formData.numParticipants}
                onChange={(e) => handleChange('numParticipants', parseInt(e.target.value))}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
              >
                <option value={1}>{t('booking.onePerson')}</option>
                <option value={2}>{t('booking.twoPeople')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0A1128] mb-2">
              {t('booking.emergencyContact')}
            </label>
            <input
              type="tel"
              value={formData.emergencyContact}
              onChange={(e) => handleChange('emergencyContact', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
              placeholder="+971526977676"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0A1128] mb-2">
              {t('booking.specialRequirements')}
            </label>
            <textarea
              value={formData.specialRequirements}
              onChange={(e) => handleChange('specialRequirements', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
              placeholder="Any special requests or requirements..."
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                onBlur={() => handleBlur('acceptTerms')}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">
                {t('booking.acceptTerms')} *
              </span>
            </label>
            {errors.acceptTerms && touched.acceptTerms && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.acceptTerms}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#E31E24] hover:bg-[#c41a20] text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
            >
              {t('booking.continueToSummary')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
