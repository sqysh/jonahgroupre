'use client'

import Picture from '@/app/components/common/Picture'
import { ContactForm } from '@/app/components/forms/ContactForm'
import { FacebookIcon } from '@/public/svg/social-media'
import { Send } from 'lucide-react'
import { useState } from 'react'

const eileenFb = 'https://www.facebook.com/EileenJonahDaly'

const EileenJonah = () => {
  const [bioExpanded, setBioExpanded] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const eileenData = {
    img: '/images/eileen-jonah-2026.jpg',
    name: 'Eileen Jonah',
    title: 'Realtor® | Century 21 North East',
    socialMedia: [
      {
        icon: FacebookIcon,
        externalLink: eileenFb
      }
    ],
    bio: "Over 20 years of real estate experience allows me to effectively help sellers and buyers navigate the complexities of the real estate transaction. A calm demeanor and attention to detail ensures that my clients home sale is in capable hands. Always one step ahead of the deal, I go above and beyond when it comes to client care and service. C21 North East's cutting edge technology and detailed marketing strategies play a large part in the buying and selling process, but my clients also receive direct and personal attention. \n Contact me anytime via cell (yes, I DO answer my phone) or email or text 7 days a week. With a degree in Business and Marketing from Simmons College, I take my continuing education seriously and know that in this ever-changing industry a REALTOR™ must be constantly learning to adapt. I am a registered Massachusetts REALTOR™.\n I also believe that community advocacy is an integral part of protecting home ownership; to that end, I am an active member of the local, state and national Association of REALTORS™. I have sat on several committees at the local North Shore Association of REALTORS™, I served as the 2015 President at NSAR and was awarded both the NSAR and Massachusetts 2015 REALTOR™ of the YEAR.\n As a full-time REALTOR™ it's my priority to connect with buyers and sellers to promote the value of homeownership in Massachusetts. In order to best serve our clients and agents, after 20 years of operating an independent family real estate company, JONAH REALTORS™ ,we joined C21 North East to enable us to offer the same highly localized market intelligence with the power of a Global Brand. Please contact me to learn more about selling, buying. My goal is to make you a client for life and leave you with the confidence to refer me to friends, family and associates."
  }

  const bioSections = eileenData.bio.split('\n').filter((section) => section.trim())

  return (
    <div className="px-3 pb-20 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="max-w-3xl 990:max-w-247.5 xl:max-w-300 mx-auto w-full">
          {/* Hero Section */}
          <div className="mt-16 mb-12 -mx-3">
            <div className="grid grid-cols-12 bg-primary-light dark:bg-primary-dark">
              {/* Accent stripe */}
              <div className="hidden sm:block col-span-2 bg-primary-light dark:bg-primary-dark" />

              {/* Content */}
              <div className="col-span-12 sm:col-span-10 bg-bg-light dark:bg-bg-dark pt-16 px-6 sm:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-12">
                  {/* Image */}
                  <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                    <div className="w-64 h-80 sm:w-80 sm:h-96">
                      <Picture
                        src={eileenData.img}
                        alt={eileenData.name}
                        className="w-full h-full object-contain scale-x-[-1]"
                        priority={true}
                      />
                    </div>
                  </div>

                  {/* Branding */}
                  <div className="w-full sm:w-auto flex-1 sm:pl-8 pb-8 sm:pb-0">
                    <div className="border-l-4 border-primary-light dark:border-primary-dark pl-6 sm:pl-8 py-4">
                      <p className="uppercase text-xs font-bold text-primary-light dark:text-primary-dark tracking-widest mb-3">
                        Affiliated With
                      </p>
                      <h2 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-2">
                        Century 21
                      </h2>
                      <p className="text-lg font-semibold text-text-light dark:text-text-dark mb-5">
                        North East
                      </p>
                      <p className="text-sm text-muted-light dark:text-muted-dark leading-7 max-w-xs">
                        Bringing 20+ years of local expertise combined with the power and reach of a
                        global brand.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Name + Title */}
          <div className="mb-12 pb-8 border-b border-border-light dark:border-border-dark">
            <h1 className="text-4xl sm:text-6xl font-bold text-text-light dark:text-text-dark mb-2">
              {eileenData.name}
            </h1>
            <p className="uppercase font-normal text-sm text-muted-light dark:text-muted-dark">
              Realtor® | Century 21 North East
            </p>
          </div>

          {/* Bio Content */}
          <div className="grid grid-cols-12 gap-10 sm:gap-16">
            {/* Left — Stats */}
            <div className="col-span-12 sm:col-span-4 xl:col-span-3">
              <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 sm:p-8 mb-8">
                <p className="uppercase text-xs font-bold text-muted-light dark:text-muted-dark mb-6 tracking-wide">
                  Key Credentials
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-bold text-primary-light dark:text-primary-dark">
                      20+
                    </p>
                    <p className="text-sm text-muted-light dark:text-muted-dark mt-2">
                      Years in Real Estate
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-light dark:text-text-dark">2015</p>
                    <p className="text-sm text-muted-light dark:text-muted-dark mt-2">
                      REALTOR® of the Year
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-text-light dark:text-text-dark">
                      Simmons College
                    </p>
                    <p className="text-sm text-muted-light dark:text-muted-dark mt-2">
                      Business & Marketing
                    </p>
                  </div>
                </div>
              </div>

              {/* Connect */}
              <div className="border-t border-border-light dark:border-border-dark pt-8">
                <p className="uppercase text-xs font-bold text-muted-light dark:text-muted-dark mb-6 tracking-wide">
                  Connect
                </p>
                <div className="flex gap-6">
                  {eileenData.socialMedia.map((social, i) => (
                    <a
                      key={i}
                      href={social.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-light dark:text-text-dark text-2xl hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
                      aria-label={`Eileen on ${social.externalLink}`}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Bio */}
            <div className="col-span-12 sm:col-span-8 xl:col-span-9">
              <div className="mb-8">
                {bioExpanded ? (
                  <div className="space-y-6">
                    {bioSections.map((section, i) => (
                      <p
                        key={i}
                        className="text-text2-light dark:text-text2-dark text-base leading-8 font-light"
                      >
                        {section.trim()}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {bioSections.slice(0, 3).map((section, i) => (
                      <p
                        key={i}
                        className="text-text2-light dark:text-text2-dark text-base leading-8 font-light"
                      >
                        {i === 2 ? `${section.substring(0, 220)}...` : section.trim()}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setBioExpanded(!bioExpanded)}
                className="uppercase font-bold text-sm text-primary-light dark:text-primary-dark tracking-wide hover:text-button-light dark:hover:text-button-dark transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                aria-expanded={bioExpanded}
              >
                {bioExpanded ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
          {/* Contact Form */}
          <div className="mt-20 pt-12 border-t border-border-light dark:border-border-dark">
            <div className="max-w-155 mx-auto w-full">
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-text-light dark:text-text-dark mb-2">
                  Get in Touch
                </h2>
                <div
                  className="w-10 h-1 bg-primary-light dark:bg-primary-dark mb-4"
                  aria-hidden="true"
                />
                <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  Fill out the form below and Eileen will get back to you as soon as possible.
                </p>
              </div>
              {submitted ? (
                <div
                  role="alert"
                  className="bg-primary-light/10 dark:bg-primary-dark/10 border border-primary-light dark:border-primary-dark p-10 text-center"
                >
                  <Send
                    className="w-10 h-10 text-primary-light dark:text-primary-dark mx-auto mb-4"
                    aria-hidden="true"
                  />
                  <p className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                    Message Sent!
                  </p>
                  <p className="text-sm text-muted-light dark:text-muted-dark mb-6">
                    Eileen will be in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase font-semibold text-primary-light dark:text-primary-dark hover:underline focus-visible:outline-none focus-visible:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <ContactForm setSubmitted={setSubmitted} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EileenJonah
