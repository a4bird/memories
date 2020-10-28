import React, { ReactElement } from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormProps = {
  defaultValues: { [K: string]: any };
  onSubmit: (formData: any) => Promise<void>;
  validationSchema: Yup.ObjectSchema | Yup.Lazy;
  children: ReactElement<{
    type?: string;
    name?: string;
  }>[];
};

export default function Form({
  defaultValues,
  children,
  onSubmit,
  validationSchema
}: FormProps) {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {React.Children.map(children, child => {
          if (child == null) return null;

          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name
                }
              })
            : child;
        })}
      </form>
    </FormProvider>
  );
}
