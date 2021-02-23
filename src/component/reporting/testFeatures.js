const testFeatures = [
    {
        name: "21",
        description: "1234",
        type: "permission",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "userWithId",
                parameters: {
                    userIds: "asd,eqa,sda,asdd,5645654,asda"
                },
                constraints: []
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "100",
                    stickiness: "default",
                    groupId: "21"
                },
                constraints: []
            }
        ],
        variants: [
            {
                name: "kkk",
                weight: 1000,
                payload: {
                    type: "string",
                    value: "kjk"
                },
                overrides: [],
                weightType: "variable",
                stickiness: "default"
            }
        ],
        createdAt: "2021-02-01T04:12:36.878Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "2afc3854-6157-4abf-a87b-e59510bc96e9",
        description: "",
        type: "release",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-22T16:05:39.717Z",
        lastSeenAt: "2021-02-22T19:37:58.189Z"
    },
    {
        name: "aaa",
        description: "asdasds",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "foobar",
                parameters: {
                    bar_p: "100",
                    ENVIRONMENT: "DEV"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-06T18:38:18.133Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "abca",
        description: "",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "userWithId",
                parameters: {
                    userIds: ""
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-14T02:42:34.515Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "accounts.reset-password.random.rollout",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-16T15:26:11.474Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "ActivityLog",
        description: "test",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "Environment",
                parameters: {
                    Dev: "",
                    QA: "",
                    Test: "",
                    Training: "",
                    Prod: ""
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-12T12:28:52.735Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "ActivityLogTesting",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-15T06:40:58.899Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "adsda",
        description: "ssadasdasdas",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "50",
                    stickiness: "random",
                    groupId: "adsda"
                },
                constraints: []
            },
            {
                name: "forClient",
                parameters: {
                    clientName: "Android,IOS"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-02T12:29:16.083Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "agasdfasdf",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "34",
                    stickiness: "default",
                    groupId: "agasdfasdf"
                },
                constraints: []
            },
            {
                name: "default",
                parameters: {},
                constraints: []
            },
            {
                name: "foobar",
                parameters: {
                    ENVIRONMENT: ""
                },
                constraints: []
            },
            {
                name: "default",
                parameters: {},
                constraints: []
            },
            {
                name: "userWithId",
                parameters: {
                    userIds: ""
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-10T08:13:37.511Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "app.main",
        description: "yeah",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "userWithId",
                parameters: {
                    userIds: "laci"
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-22T09:43:48.244Z",
        lastSeenAt: null
    },
    {
        name: "app.ToggleX",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-01-30T02:48:03.176Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "asasas",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "test1",
                parameters: {
                    codes: 'sas,{sas: ""sa sasasas" }'
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-01T07:12:48.758Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "ASASASAS",
        description: "",
        type: "permission",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {},
                constraints: []
            },
            {
                name: "userWithId",
                parameters: {
                    userIds: "123,3,4"
                },
                constraints: []
            },
            {
                name: "default",
                parameters: {},
                constraints: []
            },
            {
                name: "default",
                parameters: {},
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-22T16:56:51.205Z",
        lastSeenAt: null
    },
    {
        name: "asdasd",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "100",
                    stickiness: "default",
                    groupId: "asdasd"
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-09T20:35:51.194Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "asdasd2",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-09T20:39:57.079Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "asdqddq",
        description: "",
        type: "permission",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "rollout_schemas",
                parameters: {
                    schemas: "let"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-03T18:08:59.682Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Asdqwe1we",
        description: "",
        type: "kill-switch",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-09T16:57:28.613Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "AwesomeFF",
        description: "this is an awesome feature to release",
        type: "operational",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "47",
                    groupId: "test1"
                },
                constraints: []
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "47",
                    stickiness: "userId",
                    groupId: "AwesomeFF"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-05T09:48:54.218Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Booyeah-Who-Is-The-King",
        description: "The king of booyeah",
        type: "experiment",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [
            {
                name: "v1",
                weight: 1000,
                overrides: [],
                weightType: "variable"
            }
        ],
        createdAt: "2021-02-02T16:15:08.208Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "c79422b2-5c8e-407a-a389-77bdb5b6ad0a",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-22T16:05:25.306Z",
        lastSeenAt: null
    },
    {
        name: "CID-SFDC",
        description: "",
        type: "operational",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "cid-strategy",
                parameters: {
                    solution: "VCF,SYN"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-18T06:21:27.971Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "dark-theme",
        description: "altering css",
        type: "kill-switch",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "userWithId",
                parameters: {
                    userIds: "1,2,3"
                },
                constraints: []
            },
            {
                name: "applicationHostname",
                parameters: {
                    hostNames: ""
                },
                constraints: []
            },
            {
                name: "remoteAddress",
                parameters: {
                    IPs: ""
                }
            }
        ],
        variants: [],
        createdAt: "2021-01-29T09:33:37.806Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "DateExample",
        description: "",
        type: "release",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-16T15:55:02.423Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Demo",
        description: "",
        type: "release",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "100",
                    stickiness: "default",
                    groupId: "Demo"
                },
                constraints: []
            }
        ],
        variants: [
            {
                name: "small",
                weight: 333,
                weightType: "variable",
                payload: {
                    type: "string",
                    value: "35"
                },
                overrides: [],
                stickiness: "default"
            },
            {
                name: "medium",
                weight: 333,
                payload: {
                    type: "string",
                    value: "55"
                },
                overrides: [],
                weightType: "variable",
                stickiness: "default"
            },
            {
                name: "large",
                weight: 333,
                payload: {
                    type: "string",
                    value: "100"
                },
                overrides: [],
                weightType: "variable",
                stickiness: "default"
            }
        ],
        createdAt: "2021-01-27T09:46:38.219Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Demo33",
        description: "Just playing!",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "24",
                    stickiness: "default",
                    groupId: "Demo33"
                },
                constraints: []
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "25",
                    stickiness: "default",
                    groupId: "Demo33"
                },
                constraints: []
            },
            {
                name: "default",
                parameters: {},
                constraints: []
            }
        ],
        variants: [
            {
                name: "dfsd",
                weight: 500,
                overrides: [],
                weightType: "variable",
                stickiness: "default"
            },
            {
                name: "asdasd",
                weight: 500,
                overrides: [],
                weightType: "variable",
                stickiness: "default"
            }
        ],
        createdAt: "2021-02-08T09:44:05.906Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Demo44",
        description: "Hello toggle",
        type: "release",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "applicationHostname",
                parameters: {
                    hostNames: "de_sro"
                },
                constraints: []
            },
            {
                name: "default",
                parameters: {},
                constraints: []
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "47",
                    stickiness: "default",
                    groupId: "Demo44"
                },
                constraints: []
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "50",
                    stickiness: "default",
                    groupId: "Demo44"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-08T13:46:16.546Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Demo.Slack",
        description:
            "This feature toggle is used to demo the slack integration.",
        type: "experiment",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-05T14:32:23.140Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Demossss",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "test1",
                parameters: {
                    services: "",
                    solutions: ""
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-09T13:44:49.483Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Devtools",
        description: "Devtools",
        type: "permission",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-17T07:29:42.555Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "dfgfdg",
        description: "",
        type: "release",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "applicationHostname",
                parameters: {
                    hostNames: ""
                },
                constraints: []
            },
            {
                name: "remoteAddress",
                parameters: {
                    IPs: "tyhtyh"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-01-27T20:35:56.933Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Doemaariets",
        description: "Doe maar iets",
        type: "kill-switch",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-01-28T14:33:54.718Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "example-experiment",
        description: "Hello test",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "applicationHostname",
                parameters: {
                    hostNames: "domain.com"
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-20T12:04:44.279Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Experiment",
        description: "Experiment",
        type: "experiment",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "forClient",
                parameters: {
                    clientName: "bob,yay"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-02T19:51:30.506Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Experiment-",
        description: "",
        type: "release",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-01T20:16:05.237Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Experiment-Test",
        description: "Testing an experiment with variants.",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [
            {
                name: "blue",
                weight: 800,
                weightType: "variable",
                payload: {
                    type: "string",
                    value: "blueblue"
                },
                overrides: []
            },
            {
                name: "red",
                weight: 200,
                weightType: "fix",
                overrides: []
            }
        ],
        createdAt: "2021-02-01T20:26:07.608Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "fadfafaf",
        description: "afaf",
        type: "kill-switch",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-16T13:15:48.689Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "feature1.subfeature1",
        description: "some good feature",
        type: "permission",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [
            {
                name: "var1",
                weight: 1000,
                payload: {
                    type: "json",
                    value: "test"
                },
                overrides: [
                    {
                        contextName: "userId",
                        values: ["test2"]
                    }
                ],
                weightType: "variable"
            }
        ],
        createdAt: "2021-02-09T08:31:52.105Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "FeatureToggle",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-05T10:49:07.474Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "featureX",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "23",
                    stickiness: "default",
                    groupId: "featureX"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-19T10:48:01.501Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "FF",
        description: "Demo feature flag",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-18T10:35:42.922Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "finish-him",
        description: "kill user",
        type: "kill-switch",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "15",
                    stickiness: "random",
                    groupId: "finish-him"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-02T21:01:41.245Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "first",
        description: "",
        type: "kill-switch",
        project: "default",
        enabled: true,
        stale: true,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-09T12:40:40.965Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "foo2",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-11T17:01:58.656Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "foobar",
        description: "foobar",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "applicationHostname",
                parameters: {
                    hostNames: ""
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-11T16:50:00.205Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "foobar-toogle",
        description: "foobar toogle",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "foobar",
                parameters: {
                    bar_p: "47"
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-10T07:23:23.921Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "hack",
        description: "potato",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-04T18:08:07.321Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "hc-testing",
        description: "asdasd",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-05T20:36:46.014Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "hello",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "cooks",
                parameters: {
                    Ttt: ""
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-08T13:10:08.490Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "hello_there",
        description: "",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "11",
                    stickiness: "default",
                    groupId: "hello_there"
                },
                constraints: []
            }
        ],
        variants: [
            {
                name: "blue",
                weight: 500,
                payload: {
                    type: "string",
                    value: "blue"
                },
                overrides: [],
                weightType: "variable",
                stickiness: "default"
            },
            {
                name: "green",
                weight: 500,
                payload: {
                    type: "string",
                    value: "xx"
                },
                overrides: [],
                weightType: "variable",
                stickiness: "default"
            }
        ],
        createdAt: "2021-02-12T07:56:01.118Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "hjklhghj",
        description: "hjgjhgjhg",
        type: "permission",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "Environment",
                parameters: {
                    Dev: "true",
                    QA: "jhkjhkj",
                    Test: "hjkhjkhkj",
                    Training: "jkhjkhjk",
                    Prod: "hjkhkj"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-17T14:23:12.260Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "hock",
        description: "",
        type: "operational",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-07T00:16:29.171Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "HookbasedSytem",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-22T04:54:29.332Z",
        lastSeenAt: null
    },
    {
        name: "InativarProdutos",
        description: "InativarProdutos ",
        type: "release",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-20T14:54:19.369Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "jeroku.test",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-16T15:25:49.650Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "Jorge",
        description: "",
        type: "permission",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "remoteAddress",
                parameters: {
                    IPs: "tttt"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-09T05:12:31.849Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "killswitch",
        description: "",
        type: "kill-switch",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "applicationHostname",
                parameters: {
                    hostNames: "1234"
                }
            },
            {
                name: "applicationHostname",
                parameters: {
                    hostNames: "12345"
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-11T12:48:19.534Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "KS",
        description: "killswitch\n",
        type: "kill-switch",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-01-28T15:35:54.340Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "lala",
        description: "lala ex",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: true,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-01-30T20:48:22.509Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "lkmasd",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "100",
                    stickiness: "default",
                    groupId: "lkmasd"
                }
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "100",
                    stickiness: "default",
                    groupId: "lkmasd"
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-08T14:10:24.070Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "mahshad-second-test",
        description: "",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "0",
                    stickiness: "default",
                    groupId: "mahshad-second-test"
                },
                constraints: []
            },
            {
                name: "userWithId",
                parameters: {
                    userIds: "1,2,3"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-02T17:46:04.210Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "mahshad-unleash-test",
        description: "",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "100",
                    stickiness: "default",
                    groupId: "mahshad-unleash-test"
                }
            },
            {
                name: "userWithId",
                parameters: {
                    userIds: ""
                }
            }
        ],
        variants: [],
        createdAt: "2021-02-01T19:45:20.927Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "mmmm",
        description: "",
        type: "kill-switch",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "userWithId",
                parameters: {
                    userIds: "1"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-01-27T15:38:55.367Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "mockTimeRecordingData",
        description:
            "Mocks time recording data received from internal service.",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "RuntimeEnvironmentBased",
                parameters: {
                    runtimeEnvironmentId: "TEST"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-04T16:06:57.970Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "my-application.hack",
        description: "",
        type: "release",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-08T16:10:05.159Z",
        lastSeenAt: "2021-02-18T19:34:21.830Z"
    },
    {
        name: "My_feature",
        description: "",
        type: "permission",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [
            {
                name: "default",
                parameters: {}
            }
        ],
        variants: [],
        createdAt: "2021-02-15T07:48:34.324Z",
        lastSeenAt: null
    },
    {
        name: "mykey",
        description: "teste",
        type: "release",
        project: "default",
        enabled: true,
        stale: true,
        strategies: [
            {
                name: "default",
                parameters: {}
            },
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "50",
                    stickiness: "default",
                    groupId: "mykey"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-02-04T12:45:04.610Z",
        lastSeenAt: "2021-02-01T19:34:21.830Z"
    },
    {
        name: "my-test-boyz",
        description: "test",
        type: "experiment",
        project: "default",
        enabled: false,
        stale: true,
        strategies: [
            {
                name: "flexibleRollout",
                parameters: {
                    rollout: "9",
                    stickiness: "sessionId",
                    groupId: "my-test-boyz"
                },
                constraints: []
            },
            {
                name: "Specialgroup",
                parameters: {
                    mail: "ciao"
                },
                constraints: []
            }
        ],
        variants: [],
        createdAt: "2021-01-31T23:27:03.988Z",
        lastSeenAt: "2021-02-10T19:34:21.830Z"
    }
];

export default testFeatures;
