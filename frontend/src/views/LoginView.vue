<script>
    export default {
        name: "login_view"
    }
</script>

<template>
    <main class="min-h-screen w-full flex justify-center items-center bg-gray-500 bg-opacity-10">
        <div class="w-4/5 md:w-3/4 lg:w-3/5 bg-white rounded-md h-fit shadow-md grid grid-cols-2">
            <div class="col-span-1 bg-login bg-cover bg-center flex justify-center items-center">
                <h1 class="text-3xl capitalize font-bold text-white">welcome back</h1>
            </div>

            <div class="col-span-1 p-10">
                <h3 class="text uppercase text-center font-semibold text-lg mb-5 text-base">login</h3>

                <form action="">
                    <div class="flex flex-col gap-1">
                        <input type="email" name="email" id="email" class="" placeholder="type your email">
                    </div>

                    <div class="flex flex-col gap-1 mt-4">
                        <input type="password" name="password" id="password" class="" placeholder="type your password">
                    </div>

                    <div class="mt-5">
                        <button class="btn-confirm">submit</button>
                    </div>
                </form>

                <div class="flex mt-3 text-sm gap-1">
                    <p>Don't have an account yet ?</p>
                    <a href="" class="underline text-base">Register Here</a>
                </div>  
            </div>
        </div>
    </main>
</template>

<style></style>