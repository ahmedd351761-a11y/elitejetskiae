import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'I have never driven a Jet Ski, can I take part in the trip?',
      answer: 'Absolutely! Our experienced team will provide full training and guidance before your tour. We ensure all safety measures are in place and will teach you everything you need to know to enjoy your jet ski experience safely.'
    },
    {
      question: 'Do I need a boat or Jetski license to drive the Jetski?',
      answer: 'No license is required! Our tours are guided and we provide comprehensive instructions before departure. However, you must be at least 16 years old to drive a jet ski.'
    },
    {
      question: 'Can my child sit behind me?',
      answer: 'Yes, children can ride as passengers if they are at least 5 years old. They must wear proper safety equipment including life jackets which we provide. Maximum 2 people per jet ski.'
    },
    {
      question: 'Do you take pictures while at sea?',
      answer: 'Yes! We offer photography services during your tour to capture your amazing experience. You can purchase the photos after your tour or bring your own waterproof camera.'
    },
    {
      question: "I don't know how to swim, is that risky?",
      answer: 'While swimming ability is recommended, it is not mandatory. All participants must wear life jackets at all times, which we provide. Our guides are trained in water safety and will be with you throughout the tour.'
    },
    {
      question: 'What should I bring for the jet ski tour?',
      answer: 'We recommend bringing sunscreen, sunglasses with a strap, a towel, and a change of clothes. Waterproof cameras are welcome. We provide all safety equipment including life jackets.'
    },
    {
      question: 'What is the minimum age requirement?',
      answer: 'The minimum age to drive a jet ski is 16 years old. Children from 5 years and above can ride as passengers with an adult. All minors must be accompanied by a parent or legal guardian.'
    },
    {
      question: 'What happens if weather conditions are bad?',
      answer: 'Safety is our top priority. If weather conditions are unsuitable, we will contact you to reschedule your booking or offer a full refund. We monitor weather conditions closely and will never compromise on safety.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1128] mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-lg text-gray-600">Everything you need to know</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold text-[#0A1128] pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <div className="bg-[#E31E24] text-white rounded-full p-2">
                      <Minus size={20} />
                    </div>
                  ) : (
                    <div className="bg-[#E31E24] text-white rounded-full p-2">
                      <Plus size={20} />
                    </div>
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
