import { CodegenConfig } from '@graphql-codegen/cli';
import { WATSON_URL } from './src/lib/constants';

const config: CodegenConfig = {
    schema: [
        {
            [WATSON_URL]: {},
        },
    ],
    documents: ['./src/api/gql/*.ts'],
    generates: {
        './src/api/__generated__/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
