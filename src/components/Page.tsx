import React, { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet';

type Props = {
  children: ReactNode;
  className: string | undefined;
  title: string;
};

export type Ref = HTMLDivElement;

// eslint-disable-next-line react/display-name
const Page = forwardRef<Ref, Props>(
  ({ children, title = '', ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);

export default Page;
