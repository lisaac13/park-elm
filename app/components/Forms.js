"use client";
import React from "react";
import styled from "styled-components";

const FormSection = styled.section``;
const ContentContainer = styled.div``;
const Title = styled.h2``;
const Content = styled.p``;
const FormContainer = styled.div``;
const Form = styled.form``;
const FieldGroup = styled.div``;

const RadioContainer = styled.div``;

const FormType = {
	inquire: InquireForm,
};

const InquireForm = (
	<>
		<FormContainer>
			<Form>
				<FieldGroup>
					<label for="firstName"></label>
					<input
						id="firstName"
						type="text"
						name="firstName"
						placeholder="First Name"
					/>
				</FieldGroup>
				<FieldGroup>
					<label for="lastName"></label>
					<input
						id="lastName"
						type="text"
						name="lastName"
						placehodler="Last Name"
					/>
				</FieldGroup>
				<FieldGroup>
					<label for="email"></label>
					<input
						id="email"
						type="email"
						name="email"
						placeholder="johndoe@email.com"
					/>
				</FieldGroup>
				<FieldGroup>
					<label for="phone"></label>
					<input
						id="phone"
						type="text"
						name="phone"
						placeholder="### ### ####"
					/>
				</FieldGroup>
				<FieldGroup>
					<RadioContainer>
						<input id="broker" type="radio" name="broker" />
						<label for="broker">Yes</label>
					</RadioContainer>
					<RadioContainer>
						<input id="notbroker" type="radio" name="notbroker" />
						<label for="notbroker">No</label>
					</RadioContainer>
				</FieldGroup>
				<FieldGroup>
					<label for="message"></label>
					<textarea
						id="message"
						name="message"
						placeholder="Write Message Here"></textarea>
				</FieldGroup>
			</Form>
		</FormContainer>
	</>
);

export const FormQueryFragment = `
    ... on Page_Flexiblecontent_Sections_SingleColumnForm {
          anchor
          content
          fieldGroupName
          formToUse
          hideComponent
          title
        }
`;

export default function Forms(props) {
	const { anchor, content, title, formToUse } = props;
	return (
		<FormSection>
			{anchor && <a id={anchor}></a>}
			<ContentContainer>
				<Title>{title}</Title>
				<Content>{content}</Content>
			</ContentContainer>
			{FormType[formToUse]}
		</FormSection>
	);
}
