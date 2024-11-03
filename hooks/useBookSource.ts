import axios from "axios";
import bookSource from "@/assets/shuyuan/yuan.json";
/**
 * 书源解析hook
 */
export default function useBookSource() {

    /**
     * 从json文件中读取书源
     */
    const getBookSource = async () => {
        return bookSource;
    }

    /**
     * 校验书源
     * 1. 检查书源是否可用 请求状态是否为200
     */
    const checkBookSource = async (url: string) => {
        const response = await axios.get(url);
        return response.status === 200;
    }

    return {
        checkBookSource,
        getBookSource
    }
}