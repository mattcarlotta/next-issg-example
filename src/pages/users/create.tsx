import { useCallback, useState } from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import Button from "~components/Layout/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import generateFields from "~components/Forms/UserForm/Fields";
import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import PageContainer from "~components/Layout/PageContainer";
import WindowContainer from "~components/Layout/WindowContainer";
import Header from "~components/Navigation/Header";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
// import parseFields from "~utils/parseFields";
import {
  EventTargetValue,
  FormEvent,
  UserFormProps,
  UserFormState,
} from "~types";
import FadeIn from "~components/Layout/FadeIn";

const Form = styled.form`
  text-align: left;
  padding: 15px 10px 10px;
  background: #fff;
`;

const Title = styled.div`
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  padding: 10px;
  text-align: center;
  background: #0076ff;
`;

const CreateUserForm = (props: UserFormProps): JSX.Element => {
  const [state, setState] = useState<UserFormState>({
    fields: generateFields(props),
    isSubmitting: false,
  });

  const handleChange = useCallback(
    ({ target: { name, value } }: EventTargetValue) => {
      setState(prevState => ({
        ...prevState,
        fields: fieldUpdater(prevState.fields, name, value),
      }));
    },
    [fieldUpdater],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { validatedFields, errors } = fieldValidator(state.fields);

      setState(prevState => ({
        fields: !errors ? prevState.fields : validatedFields,
        errors,
        isSubmitting: !errors,
      }));

      if (!errors) {
        Router.push("/");
        // TODO SUBMIT FORM
      }
    },
    [state.fields, fieldValidator, Router],
  );

  return (
    <FadeIn timing="0.5s">
      <Header title="Create User" url="/users/create" />
      <WindowContainer>
        <PageContainer>
          <Title>Create User</Title>
          <Flex>
            <Form data-testid="user-form" onSubmit={handleSubmit}>
              <Flex direction="row" flexwrap justify="space-between">
                <FieldGenerator fields={state.fields} onChange={handleChange} />
              </Flex>
              <Flex style={{ padding: "0 15px", marginBottom: 10 }}>
                <FlexStart>
                  <Button
                    dataTestId="cancel"
                    danger
                    type="button"
                    onClick={() => Router.push("/")}
                  >
                    Cancel
                  </Button>
                </FlexStart>
                <FlexEnd>
                  <Button
                    dataTestId="submit"
                    primary
                    disabled={state.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </FlexEnd>
              </Flex>
            </Form>
          </Flex>
        </PageContainer>
      </WindowContainer>
    </FadeIn>
  );
};

export default CreateUserForm;
