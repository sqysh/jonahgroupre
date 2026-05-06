const getPropertySearchFormStyles = (type: string) => {
  let formStyles = {
    form: '',
    inputs: '',
    button: '',
    minMaxContainer: ''
  }

  switch (type) {
    case 'home':
      formStyles = {
        form: 'grid grid-cols-12 gap-y-4 sm:gap-x-8',
        inputs:
          'form-control py-3 px-1.5 h-12 border-2 border-border-dark rounded-sm bg-transparent text-muted-dark focus:border-primary-dark focus:outline-none col-span-12 md:col-span-6 lg:col-span-4',
        button: `col-span-12 md:col-span-2 md:col-start-11`,
        minMaxContainer: `col-span-12 md:col-span-6 lg:col-span-4 flex gap-x-4`
      }
      break
    default:
      formStyles = {
        form: 'flex flex-col gap-y-4',
        inputs:
          'form-control py-3 px-1.5 w-full border-2 border-border-light dark:border-border-dark rounded-sm bg-transparent text-text-light dark:text-text-dark placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark focus:border-primary-light dark:focus:border-primary-dark focus:outline-none',
        button: ``,
        minMaxContainer: `w-full flex gap-x-4`
      }
      break
  }

  return formStyles
}

export default getPropertySearchFormStyles
