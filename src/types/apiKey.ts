// const apiKeyDummy = {
//   id: "d4A3OK9k.pbkdf2_sha256$600000$Nv3ePxcNBoMS1A7jt0kUek$f/flUx9lAUG+aOwoi8KH5AmWF9bJzwOqmJK2jn/xOWc=",
//   api_key: "",
//   prefix: "d4A3OK9k",
//   hashed_key:
//     "pbkdf2_sha256$600000$Nv3ePxcNBoMS1A7jt0kUek$f/flUx9lAUG+aOwoi8KH5AmWF9bJzwOqmJK2jn/xOWc=",
//   created: "2024-01-20T00:55:11.431898Z",
//   name: "Keywords Demo",
//   revoked: false,
//   expiry_date: "2024-02-19T00:00:00Z",
//   key_usage: 0,
//   max_usage: -1,
//   last_used: "1970-01-01T00:00:00Z",
//   plan_name: "",
//   non_deletable: false,
//   preset_models: [
//     "gpt-3.5-turbo",
//     "gpt-4-32k",
//     "gpt-4",
//     "gpt-4-1106-preview",
//     "claude-instant-1",
//     "claude-instant-1.2",
//     "claude-2.1",
//     "claude-2",
//     "gpt-3.5-turbo-16k",
//     "chat-bison",
//     "j2-light",
//     "command-nightly",
//     "j2-mid",
//     "j2-ultra",
//   ],
//   rate_limit: 100,
//   spending_limit: 100,
//   user: 81,
//   organization: 141,
// };

import React from "react";

export type ApiKey = {
    id: string;
    api_key: string;
    prefix: string;
    is_test: boolean;
    hashed_key: string;
    created: string;
    name: string;
    revoked: boolean;
    expiry_date: string;
    key_usage: number;
    max_usage: number;
    last_used: string;
    plan_name: string;
    non_deletable: boolean;
    preset_models: string[];
    rate_limit: number;
    spending_limit: number;
    user: number;
    organization: number;
};

export type DisplayApiKey = {
    id: string;
    key: React.ReactNode;
    created: string;
    name: string;
    revoked: boolean;
    last_used: string;
    // models: React.ReactNode;
    organization: number;
    actions: React.ReactNode;
    mod_prefix: string;
};

export type ApiKeyState = {
    keyList: ApiKey[];
    newKey: ApiKey | undefined;
    editingKey: ApiKey | undefined;
    apiKey: string;
    deletingKey: ApiKey | undefined;
    loading: boolean;
};