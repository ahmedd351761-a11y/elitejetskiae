import { useState } from 'react';
import PackageSelection from './PackageSelection';
import DateTimeSelection from './DateTimeSelection';
import CustomerForm from './CustomerForm';
import BookingSummary from './BookingSummary';
import BookingConfirmation from './BookingConfirmation';
import { Package, BookingFormData } from '@/types';

type BookingStep = 'package' | 'datetime' | 'customer' | 'summary' | 'confirmation';

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('package');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [bookingData, setBookingData] = useState<Partial<BookingFormData>>({
    numParticipants: 1,
    acceptTerms: false
  });
  const [bookingReference, setBookingReference] = useState<string>('');

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setBookingData(prev => ({ ...prev, packageId: pkg.id }));
    setCurrentStep('datetime');
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setBookingData(prev => ({ ...prev, date, time }));
    setCurrentStep('customer');
  };

  const handleCustomerSubmit = (customerData: Partial<BookingFormData>) => {
    setBookingData(prev => ({ ...prev, ...customerData }));
    setCurrentStep('summary');
  };

  const handleConfirmBooking = (reference: string) => {
    setBookingReference(reference);
    setCurrentStep('confirmation');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentStep === 'datetime') setCurrentStep('package');
    else if (currentStep === 'customer') setCurrentStep('datetime');
    else if (currentStep === 'summary') setCurrentStep('customer');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {currentStep !== 'confirmation' && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {['package', 'datetime', 'customer', 'summary'].map((step, index) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep === step ? 'bg-[#E31E24] text-white' :
                    ['package', 'datetime', 'customer', 'summary'].indexOf(currentStep) > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  } font-bold`}>
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      ['package', 'datetime', 'customer', 'summary'].indexOf(currentStep) > index
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className={currentStep === 'package' ? 'font-bold text-[#E31E24]' : 'text-gray-600'}>Package</span>
              <span className={currentStep === 'datetime' ? 'font-bold text-[#E31E24]' : 'text-gray-600'}>Date & Time</span>
              <span className={currentStep === 'customer' ? 'font-bold text-[#E31E24]' : 'text-gray-600'}>Your Info</span>
              <span className={currentStep === 'summary' ? 'font-bold text-[#E31E24]' : 'text-gray-600'}>Confirm</span>
            </div>
          </div>
        )}

        {currentStep === 'package' && (
          <PackageSelection onSelect={handlePackageSelect} />
        )}

        {currentStep === 'datetime' && selectedPackage && (
          <DateTimeSelection
            package={selectedPackage}
            onSelect={handleDateTimeSelect}
            onBack={handleBack}
          />
        )}

        {currentStep === 'customer' && (
          <CustomerForm
            onSubmit={handleCustomerSubmit}
            onBack={handleBack}
          />
        )}

        {currentStep === 'summary' && selectedPackage && (
          <BookingSummary
            package={selectedPackage}
            bookingData={bookingData as BookingFormData}
            onConfirm={handleConfirmBooking}
            onBack={handleBack}
          />
        )}

        {currentStep === 'confirmation' && (
          <BookingConfirmation
            bookingReference={bookingReference}
            bookingData={bookingData as BookingFormData}
            packageName={selectedPackage?.name}
            packageDuration={selectedPackage?.duration_minutes}
            totalPrice={selectedPackage?.price_aed}
          />
        )}
      </div>
    </div>
  );
}
