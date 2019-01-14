<template>
    <div class="home">
        <el-row>
            <el-col :span="8">
                <PersonInfo/>
                <ProgressLanguage/>
            </el-col>
            <el-col :span="16">
                <CardInfo/>
                <TodoList/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PersonInfo from "../components/PersonInfo";
import ProgressLanguage from "../components/ProgressLanguage";
import CardInfo from "../components/CardInfo";
import TodoList from "../components/TodoList/TodoList"
export default {
  name: "HomePage",
  components: {
    PersonInfo,
    ProgressLanguage,
    CardInfo,
    TodoList
  }
};
</script>

<style lang="scss" scoped>
.info {
  margin-bottom: 20px;
}
.card,
.todoapp {
  margin-left: 40px;
}
.todoapp {
  margin-top: 20px;
}
</style>
