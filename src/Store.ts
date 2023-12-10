import axios from 'axios';
import {reactive, readonly} from "vue";
import {Post, today, thisMonth, thisWeek} from "@/mocks";

interface State {
    posts: PostsState
}

interface PostsState {
    loaded: boolean,
    ids: string[]
    all: Map<string, Post>
}

const all = new Map<string, Post>()
all.set(today.id, today)
all.set(thisWeek.id, thisWeek)
all.set(thisMonth.id, thisMonth)

class Store {
    private readonly state: State

    constructor(initial: State) {
        this.state = reactive(initial)
    }

    getState() {
        return readonly(this.state)
    }

    async fetchPosts() {
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        const postsState: PostsState = {
            ids: [],
            all: new Map,
            loaded: true
        }
        for (const post of response.data) {
            postsState.ids.push(post.id);
            postsState.all.set(post.id, post);
        }
        this.state.posts = postsState;
    }
}

const store = new Store({
    posts: {
        all,
        ids: [today.id, thisWeek.id, thisMonth.id],
        loaded: false,
    }
})

export function useStore() {
    return store
}

