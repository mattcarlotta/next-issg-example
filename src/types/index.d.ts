/* istanbul ignore file */
import { AxiosResponse } from "axios";
import {
  GetStaticProps,
  GetStaticPaths,
  NextPage,
  NextPageContext,
} from "next";
import { AppProps } from "next/app";

import {
  ComponentType,
  ChangeEvent,
  CSSProperties,
  FC,
  FormEvent,
  ReactNode,
} from "react";

/// ACTIONS ///

export type UserData = {
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  backgroundInfo?: string;
  address?: {
    street?: string;
    state?: string;
    suite?: string;
    city?: string;
    zipCode?: string;
  };
};

export type UserDetails = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  backgroundInfo: string;
  address: {
    street: string;
    state: string;
    suite: string;
    city: string;
    zipCode: string;
  };
};

export type UserProps = {
  props: UserData;
};

export interface UpdatedUserProps extends UserProps {
  id: string;
}

/// COMPONENTS ///

export type ActionButtonProps = {
  className?: string;
  dataTestId?: string;
  style?: CSSProperties;
};

export type BaseFieldProps = {
  name: string;
  type: string;
  label: string;
  value?: string;
  required: boolean;
  placeholder?: string;
  errors?: string;
  onChange?: (event: ChangeEvent<any>) => void;
  style?: CSSProperties;
};

export interface CardProps {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  backgroundInfo: string;
  address: any;
  className?: string;
  deleteUser: (id: string) => ReturnType<typeof actions.deleteUser>;
}

type ComponentProps = {
  className?: string;
  children?: any;
  errors?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  onChange?: (event: ChangeEvent<any>) => void;
  type?: string;
  value?: string;
  style?: CSSProperties;
};

export type ContainerProps = {
  children: ReactNode;
  dataTestId?: string;
  innerStyle?: CSSProperties;
  style?: CSSProperties;
};

export interface ButtonProps extends ComponentProps {
  dataTestId?: string;
  disabled?: boolean;
  danger?: boolean;
  padding?: string;
  primary?: boolean;
  onClick?: (event: any) => void;
  type: "button" | "submit" | "reset" | undefined;
}

export interface DeleteButtonProps extends ActionButtonProps {
  onClick: () => ReturnType<typeof actions.deleteUser>;
}

export interface DisplayUserListProps {
  data: any[];
  // deleteUser: (id: string) => void;
}

export type DropdownProps = {
  children: ReactNode;
  menu: ReactNode;
};

export type DropdownClickHandlerProps = {
  children: ({
    isVisible,
    handleMenuClick,
  }: {
    isVisible: boolean;
    handleMenuClick: () => void;
  }) => JSX.Element;
};

export type DropdownClickHandlerState = {
  isVisible: boolean;
};

export interface EditButtonProps extends ActionButtonProps {
  onClick: (event: any) => void;
}

export type EventTargetValue = {
  target: { name: string; value: string };
};

export type FieldErrorProps = {
  className?: string;
  errors?: string;
};

export type HeaderProps = {
  description: string;
  title: string;
  type: string;
  url: string;
};

export type InputProps = ComponentProps;

export type LinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

export type LoadingUsersProps = {
  className?: string;
  duration?: string;
  height?: number;
  opacity?: string;
  width?: number;
};

export type ModalProps = {
  children: ReactNode;
  maxWidth?: string;
  onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string | ReactNode;
};

export type ShowUsersState = {
  isEditingID: string;
  openModal: boolean;
};

export interface TextAreaProps extends ComponentProps {
  rows?: number;
}

export type ToastProps = {
  type: "success" | "info" | "error" | "warning";
  message?: string;
};

export interface UserCardProps {
  _id: string;
  idx: number;
  firstName: string;
  lastName: string;
  userName: string;
}

export interface UserFormFields extends BaseFieldProps {
  disabled?: boolean;
  readOnly?: boolean;
}

export interface UserFormProps extends UserData {
  _id?: string;
  title: string;
  submitForm: (fields: UserData) => Promise<{ message: string; link: string }>;
}

export interface UserFormState {
  fields: UserFormFields[];
  isSubmitting: boolean;
}

export type UserListNavigationProps = {
  className?: string;
  dropDB: (event: any) => void;
  seedDB: (event: any) => void;
};

/// UTILS ///

export type FieldKeys = "city" | "street" | "state" | "suite" | "zipCode";

export type ParseKeys<T> = {
  [K in keyof T]: T[K] extends { name: string } ? T[K]["name"] : never;
}[Exclude<keyof T, keyof []>];

export type ParseFields<T> = {
  address: {
    [N in Extract<ParseKeys<T>, FieldKeys>]: string;
  };
} & {
  [N in Exclude<ParseKeys<T>, FieldKeys>]: string;
};

export {
  AppProps,
  AxiosResponse,
  ChangeEvent,
  ComponentType,
  CSSProperties,
  GetStaticProps,
  GetStaticPaths,
  FC,
  FormEvent,
  NextFunction,
  NextPage,
  NextPageContext,
  ReactNode,
  Request,
  Response,
};
