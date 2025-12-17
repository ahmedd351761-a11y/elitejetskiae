import { CheckCircle, Calendar, Download, MapPin, Mail, Send, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { BookingFormData } from '@/types';
import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  bookingReference: string;
  bookingData: BookingFormData;
  packageName?: string;
  packageDuration?: number;
  totalPrice?: number;
}

export default function BookingConfirmation({
  bookingReference,
  bookingData,
  packageName = 'Jet Ski Tour',
  packageDuration = 60,
  totalPrice = 0
}: Props) {
  const { t, language } = useLanguage();
  const [whatsappSent, setWhatsappSent] = useState(false);

  const generateWhatsAppMessage = () => {
    const dateObj = new Date(bookingData.date);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return `🌊 *New Booking - Elite Jetskis AE* 🌊

📋 *Booking Details:*
• Reference: ${bookingReference}
• Package: ${packageName}
• Duration: ${packageDuration} minutes
• Price: ${totalPrice} AED

📅 *Date & Time:*
• Date: ${formattedDate} (${dayName})
• Time: ${bookingData.time}

👤 *Customer Information:*
• Name: ${bookingData.customerName}
• Phone: ${bookingData.customerPhone}
• Email: ${bookingData.customerEmail}
• Participants: ${bookingData.numParticipants}

${bookingData.emergencyContact ? `🚨 *Emergency Contact:* ${bookingData.emergencyContact}` : ''}
${bookingData.specialRequirements ? `📝 *Special Requirements:* ${bookingData.specialRequirements}` : ''}

💰 *Payment:* Please share payment options (bank transfer or cash on arrival)
📍 *Location:* Fishing Harbour 2, Umm Suqueim 1, Main Entrance Jumeirah 4

_Booking created: ${new Date().toLocaleString()}_`;
  };

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '971526977676';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setWhatsappSent(true);
  };

  const handleAddToCalendar = () => {
    const dateTime = new Date(`${bookingData.date}T${bookingData.time}`);
    const endTime = new Date(dateTime.getTime() + packageDuration * 60000);

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(packageName)}&dates=${dateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&location=Fishing%20Harbour%202%2C%20Umm%20Suqueim%201&description=${encodeURIComponent(`Booking Reference: ${bookingReference}`)}`;

    window.open(calendarUrl, '_blank');
  };

  const handleDownloadConfirmation = () => {
    const message = generateWhatsAppMessage();
    const element = document.createElement('a');
    const file = new Blob([message], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `booking-${bookingReference}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-3xl mx-auto pt-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
        <div className="inline-flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-6 mb-6">
              <CheckCircle size={64} className="text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[#0A1128] mb-2">
          {t('booking.confirmed')}
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          {t('booking.adventureSet')}
        </p>

        {!whatsappSent && (
          <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-amber-500 flex-shrink-0 mt-0.5" size={24} />
            <div className="text-left">
              <p className="font-bold text-amber-800">{t('booking.actionRequired')}</p>
              <p className="text-amber-700 text-sm">
                {t('booking.contactWhatsApp')}
              </p>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-[#E31E24]/10 to-[#0A1128]/10 rounded-2xl p-8 mb-8 border-2 border-[#E31E24]">
          <p className="text-sm text-gray-600 mb-2 uppercase tracking-widest font-semibold">{t('booking.bookingReference')}</p>
          <p className="text-4xl font-black text-[#E31E24] font-mono">{bookingReference}</p>
        </div>

        <div className={`rounded-2xl p-6 mb-8 border-2 transition-all ${whatsappSent ? 'bg-green-50 border-green-500' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500'}`}>
          {whatsappSent ? (
            <>
              <div className="flex items-center justify-center gap-3 mb-3">
                <CheckCircle className="text-green-600" size={28} />
                <p className="text-green-900 font-bold text-lg">{t('booking.whatsAppSent')}</p>
              </div>
              <p className="text-green-700 text-sm">
                {t('booking.teamWillRespond')}
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                  {t('booking.step1of1')}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <Send className="text-green-600" size={24} />
                <p className="text-green-900 font-bold text-lg">{t('booking.completeViaWhatsApp')}</p>
              </div>
              <p className="text-green-800 text-sm leading-relaxed">
                <strong>{t('booking.required')}</strong> {t('booking.sendDetails')}
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <Calendar className="text-[#E31E24] mx-auto mb-3" size={32} />
            <p className="text-sm text-gray-600 mb-1">{t('booking.date')}</p>
            <p className="font-bold text-[#0A1128]">
              {new Date(bookingData.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <CheckCircle className="text-[#E31E24] mx-auto mb-3" size={32} />
            <p className="text-sm text-gray-600 mb-1">{t('booking.time')}</p>
            <p className="font-bold text-[#0A1128]">{bookingData.time}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <MapPin className="text-[#E31E24] mx-auto mb-3" size={32} />
            <p className="text-sm text-gray-600 mb-1">{t('booking.location')}</p>
            <p className="font-bold text-[#0A1128]">Jumeirah 4</p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <button
            onClick={handleSendWhatsApp}
            className={`w-full px-6 py-5 rounded-full font-bold transition-all flex items-center justify-center gap-3 shadow-lg ${
              whatsappSent 
                ? 'bg-green-600 text-white shadow-green-600/40' 
                : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 shadow-green-500/40 animate-pulse'
            }`}
          >
            <Send size={24} />
            <span className="text-lg">{whatsappSent ? t('booking.sentToWhatsApp') : t('booking.sendViaWhatsApp')}</span>
          </button>
          
          {!whatsappSent && (
            <p className="text-center text-sm text-gray-500">
              {t('booking.clickToOpen')}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCalendar}
              className="bg-[#E31E24] hover:bg-[#c41a20] text-white px-4 py-3 rounded-full font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-[#E31E24]/40"
            >
              <Calendar size={18} />
              <span className="hidden sm:inline">{t('booking.calendar')}</span>
            </button>

            <button
              onClick={handleDownloadConfirmation}
              className="bg-[#0A1128] hover:bg-[#1a2847] text-white px-4 py-3 rounded-full font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-[#0A1128]/40"
            >
              <Download size={18} />
              <span className="hidden sm:inline">{t('booking.download')}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold text-[#0A1128] mb-6">{t('booking.whatToBring')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{t('booking.validId')}</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{t('booking.sunscreen')}</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{t('booking.towel')}</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{t('booking.camera')}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-[#0A1128] mb-6">{t('booking.locationDirections')}</h3>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-left border border-blue-200">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={28} />
              <div className="flex-1">
                <p className="font-bold text-[#0A1128] mb-2 text-lg">EliteJetskis AE</p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Fishing Harbour 2, Umm Suqueim 1<br />
                  Main Entrance Jumeirah 4, Dubai
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={`https://maps.google.com/maps?q=Fishing+Harbour+2+Umm+Suqueim+Dubai`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  >
                    {t('booking.getDirections')}
                  </a>
                  <a
                    href="https://wa.me/971526977676"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  >
                    {t('booking.whatsAppUs')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-gray-600">
          <p className="mb-4 font-semibold text-[#0A1128]">{t('booking.questions')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <a href="tel:+971526977676" className="text-[#E31E24] hover:underline font-semibold flex items-center gap-1">
              📱 +971 52 697 7676
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a href="mailto:elitejetskisae@gmail.com" className="text-[#E31E24] hover:underline font-semibold flex items-center gap-1">
              ✉️ elitejetskisae@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#E31E24] hover:text-[#c41a20] font-semibold transition-colors"
          >
            {t('booking.backToHome')}
          </a>
        </div>
      </div>
    </div>
  );
}
