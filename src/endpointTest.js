import http from 'k6/http';
import { logIn } from '../auth.js';
import config from '../config.js';

export const options = {
    stages: config.loadTest.stages

};

export default function () {
    getCourses();
    listAllCourses();
    enrollCourse();
}

export function getCourses() {
    const token = logIn(config);
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    http.get(`${config.baseURL}/courses/${config.courseId}`, {
        headers: headers,
        tags: { my_custom_tag: `/courses/${config.courseId}` },
    });
}

export function listAllCourses() {

    const accessToken = logIn(config);

    const authHeaders = {
        Authorization: `Bearer ${accessToken}`,
    };
    sendRequest(
        "GET",
        "/courses",
        null,
        { headers: authHeaders, tags: { name: "listAllCourses" } },
    );
}

export function enrollCourse() {
    const accessToken = logIn(config);
    const courseId = config.courseId;
    const userId = config.userId;
    const body = { course_id: courseId, user_id: userId };

    const authHeaders = {
        Authorization: `Bearer ${accessToken}`,
    };
    const res = sendRequest(
        "POST",
        "/enroll",
        JSON.stringify(body),
        { headers: authHeaders, tags: { name: "enrollCourse" } }
    );

    console.log('Enroll course response status:', res.status);
    console.log('Enroll course response body:', res.body);
}

function sendRequest(method, url, body, params) {
    const fullUrl = `${config.baseURL}${url}`;
    const res = http.request(method, fullUrl, body ? body : null, params);
    return res;
}