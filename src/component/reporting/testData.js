export const testProjects = [
    { id: "default", inital: true, name: "Default" },
    { id: "myProject", inital: false, name: "MyProject" }
];

export const testFeatures = [
    {
        name: "one",
        description: "1234",
        type: "permission",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        createdAt: "2021-02-01T04:12:36.878Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "two",
        description: "",
        type: "release",
        project: "default",
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        createdAt: "2021-02-22T16:05:39.717Z",
        lastSeenAt: "2021-02-22T19:37:58.189Z"
    },
    {
        name: "three",
        description: "asdasds",
        type: "experiment",
        project: "default",
        enabled: true,
        stale: false,
        strategies: [],
        variants: [],
        createdAt: "2021-02-06T18:38:18.133Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "four",
        description: "",
        type: "experiment",
        project: "myProject",
        enabled: true,
        stale: false,
        strategies: [],
        variants: [],
        createdAt: "2021-02-14T02:42:34.515Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    },
    {
        name: "five",
        description: "",
        type: "release",
        project: "myProject",
        enabled: true,
        stale: false,
        strategies: [],
        variants: [],
        createdAt: "2021-02-16T15:26:11.474Z",
        lastSeenAt: "2021-02-21T19:34:21.830Z"
    }
];
