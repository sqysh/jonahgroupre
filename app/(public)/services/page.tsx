import Picture from '@/app/components/common/Picture'
import servicesData from '@/app/lib/constants/services-data'
import servicesStatsData from '@/app/lib/constants/services-stats-data'
import { Mail } from 'lucide-react'
import Link from 'next/link'

const Services = () => {
  return (
    <div className="bg-bg-light dark:bg-bg-dark px-3">
      {/* Hero Section */}
      <div className="max-w-3xl 990:max-w-247.5 xl:max-w-300 mx-auto border-b border-border-light dark:border-border-dark py-16 sm:py-24">
        <div className="">
          <div className="grid grid-cols-1 990:grid-cols-2 gap-12 990:gap-16 items-center">
            {/* Image */}
            <div className="order-1 990:order-2">
              <div className="relative aspect-square w-full max-w-120 mx-auto 990:max-w-full">
                <div
                  className="absolute -top-3 -left-3 w-full h-full border-2 border-primary-light dark:border-primary-dark"
                  aria-hidden="true"
                />
                <Picture
                  src="/images/eileen-jonah-2026.jpg"
                  alt="Eileen Jonah"
                  className="relative z-10 w-full h-full object-cover"
                  priority={true}
                />
              </div>
            </div>

            {/* Text */}
            <div className="order-2 990:order-1">
              <p className="text-xs uppercase font-bold tracking-widest text-primary-light dark:text-primary-dark mb-4">
                Real Estate Services
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-4 leading-tight">
                Let Us Guide You Through Your Real Estate Journey
              </h2>
              <div
                className="w-10 h-1 bg-primary-light dark:bg-primary-dark mb-6"
                aria-hidden="true"
              />
              <p className="text-base text-text2-light dark:text-text2-dark font-medium mb-10 leading-relaxed">
                With over 20 years of experience, Eileen can help you list your home and market it
                for optimum exposure or buy your dream home with a competitive offer.
              </p>

              {/* Services List */}
              <div className="flex flex-col gap-6">
                {servicesData.map((obj, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div
                      className="w-1 shrink-0 mt-1.5 self-stretch bg-border-light dark:bg-border-dark group-hover:bg-primary-light dark:group-hover:bg-primary-dark transition-colors duration-200"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-base font-bold text-text-light dark:text-text-dark mb-1">
                        {obj.title}
                      </h3>
                      <p className="text-sm text-text2-light dark:text-text2-dark leading-6">
                        {obj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark text-sm font-bold uppercase tracking-wide hover:bg-button-light dark:hover:bg-button-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark focus-visible:ring-offset-2"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Contact Eileen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-3xl 990:max-w-247.5 xl:max-w-1200 mx-auto px-3 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {servicesStatsData.map((stat, i) => {
              const IconComponent = stat.icon
              return (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary-light/10 dark:bg-primary-dark/10">
                    <IconComponent
                      className="w-6 h-6 text-primary-light dark:text-primary-dark"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-3xl sm:text-4xl text-text-light dark:text-text-dark leading-none">
                    {stat.value}
                  </h3>
                  <p className="uppercase text-muted-light dark:text-muted-dark text-xs tracking-widest font-semibold">
                    {stat.textKey}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
