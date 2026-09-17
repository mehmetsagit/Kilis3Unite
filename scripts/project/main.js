// Giris navigation: mouse and touch input.
runOnStartup(async runtime =>
{
    let cursorStyle = null;
    runtime.addEventListener("tick2", () =>
    {
        let clickable = false;
        if (runtime.layout.name === "giris")
        {
            const { arka, btn1, btn2, ev } = getGirisObjects(runtime);
            const targets = arka.animationFrame === 0 ? [btn1, btn2] : [ev];
            clickable = targets.some(instance =>
            {
                if (!instance.isVisible) return false;
                const [x, y] = runtime.mouse.getMousePosition(instance.layer.name);
                return instance.containsPoint(x, y);
            });
        }
        const nextStyle = clickable ? "pointer" : "default";
        if (nextStyle !== cursorStyle)
        {
            runtime.mouse.setCursorStyle(nextStyle);
            cursorStyle = nextStyle;
        }
    });

    runtime.addEventListener("beforeanylayoutstart", ({ layout }) =>
    {
        if (layout.name !== "giris") return;
        const { arka, btn1, btn2, ev } = getGirisObjects(runtime);
        btn1.opacity = 0;
        btn2.opacity = 0;
        arka.animationSpeed = 0;
        arka.animationFrame = 0;
        ev.isVisible = false;
    });

    runtime.addEventListener("pointerdown", event =>
    {
        if (runtime.layout.name !== "giris" || event.button !== 0) return;
        const { arka, btn1, btn2, ev } = getGirisObjects(runtime);
        if (arka.animationFrame !== 0)
        {
            if (ev.isVisible && isPointerOver(ev, event))
            {
                arka.animationFrame = 0;
                ev.isVisible = false;
            }
            return;
        }
        if (isPointerOver(btn1, event))
        {
            arka.animationFrame = 1;
            ev.isVisible = true;
        }
        else if (isPointerOver(btn2, event))
        {
            arka.animationFrame = 2;
            ev.isVisible = true;
        }
    });
});

function getGirisObjects(runtime)
{
    return {
        arka: runtime.objects.arka.getFirstInstance(),
        btn1: runtime.objects.btn1.getFirstInstance(),
        btn2: runtime.objects.btn2.getFirstInstance(),
        ev: runtime.objects.ev.getFirstInstance()
    };
}

function isPointerOver(instance, event)
{
    // Account for fullscreen scaling and layer transforms.
    const [x, y] = instance.layer.cssPxToLayer(event.clientX, event.clientY);
    return instance.containsPoint(x, y);
}
