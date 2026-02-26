import { useForm as useFormTS } from '@tanstack/react-form'

export const useForm = <T>(
  defaultValues: T,
  onSubmit: (values: T) => void
) => {
  const form = useFormTS({
    defaultValues: defaultValues,
    onSubmit: async ({ value, formApi }) => {
      await formApi.validateAllFields('submit');
      onSubmit(value);
    }
  })

  return {
    Field: form.Field,
    handleSubmit: form.handleSubmit,
    getAllErrors: form.getAllErrors,
    Subscribe: form.Subscribe
  }
}