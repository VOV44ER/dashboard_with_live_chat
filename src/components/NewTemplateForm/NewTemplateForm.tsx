import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import { useParams, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  Editor,
  EditorState,
  Modifier,
  CompositeDecorator,
  convertToRaw,
  ContentState,
  DraftHandleValue,
} from 'draft-js';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CustomSelect } from './CustomSelect';
import {
  NewTemplateBoxStyled,
  NavButtonStyled,
  MainGridWrapperStyled,
  TypographySubtitleStyled,
  TextFieldStyled,
  BoxWrapperFormat,
  BoxWrapperSubmit,
} from './stylesNewTemplateForm';
import 'draft-js/dist/Draft.css';
import './styles.css';
import { createTemplate } from '../../store/thunks/templatesThunks';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { findWithRegex } from '../../helpers/findWithRegex';
import { history } from '../../routes/historyHelper/history';

const templateCategory = [
  { id: '1', value: 'transactional', name: 'transactional' },
];

const templateType = [
  { id: '1', value: 'text', name: 'TEXT' },
];

const templateLanguage = [
  { id: '1', value: 'en', name: 'English' },
  { id: '2', value: 'it', name: 'Italian' },
];

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Required'),
  category: yup
    .string()
    .trim()
    .required('Please select a category'),
  type: yup
    .string()
    .trim()
    .required('Please select a type'),
  language: yup
    .string()
    .trim()
    .required('Please select a language'),
});

const BRACES_REGEX = /{{[\w+(?:.\w+)]+}}/g;

const compositeDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback) => {
      findWithRegex(BRACES_REGEX, contentBlock, callback);
    },
    component: (props: any) => (
      <span {...props} style={{ color: '#00c173' }}>
        {props.children}
      </span>
    ),
  },
]);

type LocationState = {
  from: string
};

export const NewTemplateForm: React.FC = () => {
  const { templates } = useAppSelector((state) => state.templates);
  const { duplicate } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const selected = templates.find((item) => item.id === duplicate);
  const [editorState, setEditorState] = useState(() => {
    if (selected) {
      let text = selected.bodyText;
      // eslint-disable-next-line no-restricted-syntax
      for (const item of selected.exampleParameters) {
        text = text.replace(/{{(\d)}}/, `{{${item}}}`);
      }
      const content = ContentState.createFromText(text);
      return EditorState.createWithContent(content, compositeDecorator);
    }
    return EditorState.createEmpty(compositeDecorator);
  });
  const state = location.state as LocationState;

  const { blocks } = convertToRaw(editorState.getCurrentContent());
  const value = blocks
    .map((block) => (!block.text.trim() && '\n') || block.text)
    .join('\n');

  const insertPlaceholder = (placeholderText: string) => {
    const newContentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      `${placeholderText} `,
    );

    setEditorState(EditorState.createWithContent(newContentState));
  };

  useEffect(() => {
    if (editorState && !editorState.getDecorator()) {
      setEditorState(() => EditorState.set(editorState, { decorator: compositeDecorator }));
    }
  }, [editorState]);

  const formik = useFormik({
    initialValues: {
      name: '',
      category: selected?.category || '',
      type: selected?.type || '',
      language: selected?.iso639LanguageCode || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      let result = value;
      const preparedArr = value
        ?.match(BRACES_REGEX)
        ?.map((item) => item.replace(/[^a-zA-Z]+/g, ''));

      if (preparedArr && preparedArr.length > 0) {
        result = result.replace(
          /{{(\w+)}}/g,
          (_, n) => `{{${preparedArr.indexOf(n) + 1}}}`,
        );
      }

      const preparedObj = {
        name: values.name,
        iso639LanguageCode: values.language,
        type: values.type,
        bodyText: result,
        category: values.category,
        exampleParameters: preparedArr || [],
      };
      const response = await dispatch(createTemplate(preparedObj));
      response.meta.requestStatus === 'fulfilled' && history.back();
    },
  });

  const handleKeyCommand = (command: string): DraftHandleValue => {
    if (command === 'backspace') {
      const selectionState = editorState.getSelection();
      const anchorKey = selectionState.getAnchorKey();
      const currentContent = editorState.getCurrentContent();
      const myContentBlock = currentContent.getBlockForKey(anchorKey);
      const end = selectionState.getEndOffset();
      const slicedText = myContentBlock.getText().slice(0, end);
      let start = slicedText.lastIndexOf(' ');
      if (start === -1) {
        start = 0;
      }
      const word = slicedText.slice(start);
      if (word && BRACES_REGEX.test(word)) {
        const text = value.replace(word, '');
        const content = ContentState.createFromText(text);
        const editor = EditorState.createWithContent(content);
        setEditorState(() => EditorState.moveFocusToEnd(editor));
        return 'handled';
      }
    }

    return 'not-handled';
  };

  return (
    <NewTemplateBoxStyled>
      <NavButtonStyled
        onClick={() => history.back()}
        variant="text"
        size="large"
        startIcon={<ArrowBackIcon />}
      >
        {state?.from || 'Template Table'}
      </NavButtonStyled>
      <Paper elevation={3}>
        <form onSubmit={formik.handleSubmit}>
          <MainGridWrapperStyled
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              container
              direction="column"
              xs={6}
              justifyContent="center"
              alignItems="center"
              sx={{ gap: '10px' }}
            >
              <Typography variant="h5">Template Name</Typography>
              <TypographySubtitleStyled variant="subtitle2">
                Define what use-case does this template serves e.g Account
                update, OTP, etc in 2-3 words.
              </TypographySubtitleStyled>
              <TextFieldStyled
                variant="outlined"
                placeholder="Enter template name"
                required
                id="name"
                name="name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid
              item
              container
              xs={6}
              justifyContent="center"
              alignItems="center"
            >
              <CustomSelect
                placeholder="Select message categories"
                label="Template Category"
                data={templateCategory}
                text="Your template should fall under one of these categories."
                val={formik.values.category}
                change={formik.handleChange}
                name="category"
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              />
            </Grid>
            <Grid
              item
              container
              xs={6}
              justifyContent="center"
              alignItems="center"
            >
              <CustomSelect
                placeholder="Select message type"
                label="Template Type"
                data={templateType}
                text="Image, video & document will be considered as Media Type"
                val={formik.values.type}
                change={formik.handleChange}
                name="type"
                error={formik.touched.type && Boolean(formik.errors.type)}
              />
            </Grid>
            <Grid
              item
              container
              xs={6}
              justifyContent="center"
              alignItems="center"
            >
              <CustomSelect
                placeholder="Select message language"
                text="You will need to specify the language in which message template is submitted."
                label="Template Language"
                data={templateLanguage}
                val={formik.values.language}
                change={formik.handleChange}
                name="language"
                error={
                  formik.touched.language && Boolean(formik.errors.language)
                }
              />
            </Grid>
            <Grid
              item
              container
              direction="column"
              xs={6}
              justifyContent="center"
              alignItems="center"
              sx={{ gap: '20px' }}
            >
              <Typography variant="h5">Template Format</Typography>
              <BoxWrapperFormat>
                <TypographySubtitleStyled variant="subtitle2">
                  Your message content.
                  <br />
                  Upto 1024 characters are allowed
                </TypographySubtitleStyled>
                <Button
                  variant="text"
                  onClick={() => insertPlaceholder('{{parametr}}')}
                >
                  {'{{ Add parametr }}'}
                </Button>
              </BoxWrapperFormat>
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Write something..."
                handleKeyCommand={handleKeyCommand}
              />
              <TypographySubtitleStyled variant="subtitle2">
                {`${
                  editorState.getCurrentContent().getPlainText('\u0001').length
                }/1024 Characters`}
              </TypographySubtitleStyled>
            </Grid>
          </MainGridWrapperStyled>
          <BoxWrapperSubmit>
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Typography variant="subtitle2" sx={{ color: 'gray' }}>
              It may take more than 5 minutes for template to get approved
            </Typography>
          </BoxWrapperSubmit>
        </form>
      </Paper>
    </NewTemplateBoxStyled>
  );
};
