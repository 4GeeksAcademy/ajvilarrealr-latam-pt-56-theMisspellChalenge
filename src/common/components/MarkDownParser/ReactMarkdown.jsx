/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import PropTypes from 'prop-types';
import rehypeRaw from 'rehype-raw';
import { Img } from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import {
  BeforeAfter, Code, MDHeading, MDLink, OnlyForBanner,
} from './MDComponents';
import { usePersistent } from '../../hooks/usePersistent';
import Toc from './toc';
import ContentHeading from './ContentHeading';
import CallToAction from '../CallToAction';

// Did you know you can use tildes instead of backticks for code in markdown? ✨
// const markdown = `Here is some JavaScript code:
const MarkDownParser = ({
  // eslint-disable-next-line no-unused-vars
  content, callToActionProps, withToc, frontMatter, titleRightSide,
}) => {
  const { t } = useTranslation('common');
  const [learnpackActions, setLearnpackActions] = useState([]);
  const [cohortSession] = usePersistent('cohortSession', {});

  const newExerciseText = t('learnpack.new-exercise');
  const continueExerciseText = t('learnpack.continue-exercise');

  const {
    token, assetSlug, assetType, gitpod,
  } = callToActionProps;

  useEffect(() => {
    setLearnpackActions([
      {
        text: newExerciseText,
        href: `${process.env.BREATHECODE_HOST}/asset/${assetSlug}?token=${token}`,
        isExternalLink: true,
      },
      {
        text: continueExerciseText,
        href: 'https://gitpod.io/workspaces',
        isExternalLink: true,
      },
    ]);
  }, [token, assetSlug, newExerciseText, continueExerciseText]);

  return (
    <>
      <ContentHeading
        titleRightSide={titleRightSide}
        callToAction={gitpod === true && assetType === 'EXERCISE' && (
          <CallToAction
            styleContainer={{
              maxWidth: '800px',
            }}
            buttonStyle={{
              color: 'white',
            }}
            background="blue.default"
            margin="12px 0 20px 0px"
            imageSrc="/static/images/learnpack.png"
            text={t('learnpack.description')}
            width={{ base: '100%', md: 'fit-content' }}
            buttonsData={learnpackActions}
          />
        )}
        content={frontMatter}
      >
        {withToc && (
          <Toc content={content} />
        )}
      </ContentHeading>
      <ReactMarkdown
      // gemoji plugin
        remarkPlugins={[remarkGfm, remarkGemoji]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: MDLink,
          code: Code,
          h1: ({ ...props }) => <MDHeading tagType="h2" {...props} />,
          h2: ({ ...props }) => <MDHeading tagType="h2" {...props} />,
          h3: ({ ...props }) => <MDHeading tagType="h3" {...props} />,
          ul: ({ ...props }) => <ul className="md-bullet" {...props} />,
          ol: ({ ...props }) => <ol className="md-bullet" {...props} />,
          img: ({ ...props }) => <Img className="MDImg" {...props} />,
          BeforeAfter,
          'before-after': BeforeAfter,
          iframe: ({ ...props }) => <iframe title={props.title || 'iframe-content'} className="MDIframe" {...props} />,
          // iframe: {
          //   props: {
          //     className: 'MDIframe',
          //   },
          // },
          // table: {
          //   component: MDTable,
          // },
          onlyfor: ({ ...props }) => <OnlyForBanner cohortSession={cohortSession} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </>
  );
};

MarkDownParser.propTypes = {
  content: PropTypes.string,
  callToActionProps: PropTypes.objectOf(PropTypes.any),
  withToc: PropTypes.bool,
  frontMatter: PropTypes.objectOf(PropTypes.any),
  titleRightSide: PropTypes.node,
};
MarkDownParser.defaultProps = {
  content: '',
  callToActionProps: {},
  withToc: false,
  frontMatter: {},
  titleRightSide: null,
};

export default MarkDownParser;
